import { ErrorType } from "@/constants/errors";
import { createClient } from "@/lib/supabase/serverClient";
import { createValidationErrorResponse } from "@/lib/utils/error";
import { CreateReviewRequest } from "@/types/review";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const supabase = await createClient();

  // 현재 로그인한 사용자 정보 가져오기 (좋아요 상태 확인용)
  const { data: { user } } = await supabase.auth.getUser();

  try {
    // 1. 리뷰 데이터 가져오기
    const { data: reviews, error } = await supabase
      .from('movie_reviews')
      .select('*')
      .eq('movie_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Review fetch error:', error);
      return NextResponse.json(
        { ok: false, message: '리뷰를 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 2. 각 리뷰의 작성자 정보와 좋아요 정보 가져오기
    const reviewsWithProfiles = await Promise.all(
      (reviews || []).map(async (review) => {
        // 프로필 정보 가져오기
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('name, profile_image_url')
          .eq('user_id', review.user_id)
          .maybeSingle();

        if (profileError) {
          console.log('Profile error for user_id', review.user_id, ':', profileError);
        }

        // 좋아요 수 가져오기
        const { count: likesCount, error: likesError } = await supabase
          .from('review_likes')
          .select('*', { count: 'exact', head: true })
          .eq('review_id', review.id);

        if (likesError) {
          console.log('Likes count error for review_id', review.id, ':', likesError);
        }

        // 현재 사용자의 좋아요 상태 확인
        let isLikedByUser = false;
        console.log('User check - user exists:', !!user, user?.id);
        
        if (user) {
          console.log('Checking likes for review_id:', review.id, 'user_id:', user.id);
          
          const { data: userLike, error: userLikeError } = await supabase
            .from('review_likes')
            .select('*')
            .eq('review_id', review.id)
            .eq('user_id', user.id)
            .maybeSingle();
          
          console.log('Query result - userLike:', userLike, 'error:', userLikeError);
          
          // maybeSingle()은 데이터가 없어도 에러를 발생시키지 않음
          isLikedByUser = !!userLike;
          console.log('Final isLikedByUser:', isLikedByUser);
          
          if (userLikeError) {
            console.log('User like check error for review_id', review.id, ':', userLikeError);
          }
        }

        return {
          ...review,
          profiles: profile || { name: 'Anonymous', profile_image_url: null },
          likes_count: likesCount || 0,
          is_liked_by_user: isLikedByUser
        };
      })
    );
    return NextResponse.json({
      ok: true,
      data: reviewsWithProfiles
    });
  } catch (error) {
    console.error('Review fetch error:', error);
    return NextResponse.json(
      { ok: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}


export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const errors: ErrorType[] = [];

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    errors.push(ErrorType.UNAUTHORIZED);
  }
  if (errors.length > 0 || !user) {
    return createValidationErrorResponse(errors);
  }

  try {
    const body: CreateReviewRequest = await req.json();
    
    if (!body.rating || body.rating < 1 || body.rating > 10) {
      return NextResponse.json(
        { ok: false, message: '평점은 1점에서 10점 사이여야 합니다.' },
        { status: 400 }
      );
    }

    if (!body.body || body.body.trim().length === 0) {
      return NextResponse.json(
        { ok: false, message: '리뷰 내용을 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data: existingReview } = await supabase
      .from('movie_reviews')
      .select('id')
      .eq('user_id', user.id)
      .eq('movie_id', id)
      .single();

    if (existingReview) {
      return NextResponse.json(
        { ok: false, message: '이미 이 영화에 리뷰를 작성했습니다.' },
        { status: 400 }
      );
    }

    // 1. 리뷰 생성
    const { data: review, error: insertError } = await supabase
      .from('movie_reviews')
      .insert({
        user_id: user.id,
        movie_id: id,
        rating: body.rating,
        body: body.body.trim()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Review insert error:', insertError);
      return NextResponse.json(
        { ok: false, message: '리뷰 작성 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
    

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, profile_image_url')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileError) {
      console.log('Profile error for user_id', user.id, ':', profileError);
    }

    const reviewWithProfile = {
      ...review,
      profiles: profile || { name: 'Anonymous', profile_image_url: null }
    };

    return NextResponse.json({
      ok: true,
      message: '리뷰가 작성되었습니다.',
      data: reviewWithProfile
    });
  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { ok: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}