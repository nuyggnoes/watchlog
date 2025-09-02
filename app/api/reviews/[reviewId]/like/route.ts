import { ErrorType } from "@/constants/errors";
import { createClient } from "@/lib/supabase/serverClient";
import { createValidationErrorResponse } from "@/lib/utils/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  const { reviewId } = await params;
  const supabase = await createClient();
  
  // 사용자 인증 확인
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return createValidationErrorResponse([ErrorType.UNAUTHORIZED]);
  }

  try {
    // 리뷰 존재 여부 확인
    const { data: review, error: reviewError } = await supabase
      .from('movie_reviews')
      .select('id')
      .eq('id', reviewId)
      .single();

    if (reviewError || !review) {
      return NextResponse.json(
        { ok: false, message: '리뷰를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 좋아요했는지 확인
    const { data: existingLike } = await supabase
      .from('review_likes')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingLike) {
      // 좋아요 취소
      const { error: deleteError } = await supabase
        .from('review_likes')
        .delete()
        .eq('review_id', reviewId)
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Like delete error:', deleteError);
        return NextResponse.json(
          { ok: false, message: '좋아요 취소 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        ok: true, 
        liked: false,
        message: '좋아요를 취소했습니다.' 
      });
    } else {
      // 좋아요 추가
      const { error: insertError } = await supabase
        .from('review_likes')
        .insert({ 
          review_id: reviewId, 
          user_id: user.id 
        });

      if (insertError) {
        console.error('Like insert error:', insertError);
        return NextResponse.json(
          { ok: false, message: '좋아요 추가 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        ok: true, 
        liked: true,
        message: '좋아요를 추가했습니다.' 
      });
    }
  } catch (error) {
    console.error('Review like error:', error);
    return NextResponse.json(
      { ok: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 좋아요 상태 조회 (선택적)
export async function GET(
  req: NextRequest,
  { params }: { params: { reviewId: string } }
) {
  const { reviewId } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  try {
    // 좋아요 수 조회
    const { count: likesCount, error: countError } = await supabase
      .from('review_likes')
      .select('*', { count: 'exact', head: true })
      .eq('review_id', reviewId);

    if (countError) {
      console.error('Likes count error:', countError);
      return NextResponse.json(
        { ok: false, message: '좋아요 수 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    let isLiked = false;
    if (user) {
      // 현재 사용자의 좋아요 상태 확인
      const { data: userLike } = await supabase
        .from('review_likes')
        .select('id')
        .eq('review_id', reviewId)
        .eq('user_id', user.id)
        .maybeSingle();

      isLiked = !!userLike;
    }

    return NextResponse.json({
      ok: true,
      likes_count: likesCount || 0,
      is_liked_by_user: isLiked
    });
  } catch (error) {
    console.error('Review like status error:', error);
    return NextResponse.json(
      { ok: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}