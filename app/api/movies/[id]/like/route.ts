import { ErrorType } from "@/constants/errors";
import { createClient } from "@/lib/supabase/serverClient";
import { createValidationErrorResponse } from "@/lib/utils/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
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
    // Check if already liked
    const { data: existingLike } = await supabase
      .from('movie_likes')
      .select('id')
      .eq('user_id', user.id)
      .eq('movie_id', id)
      .single();

    if (existingLike) {
      // 좋아요 취소
      const { error: deleteError } = await supabase
        .from('movie_likes')
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', id);

      if (deleteError) {
        return NextResponse.json(
          { ok: false, message: '좋아요 취소 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        ok: true, 
        message: '좋아요를 취소했습니다.',
        isLiked: false 
      });
    } else {
      // 좋아요 추가
      const { error: insertError } = await supabase
        .from('movie_likes')
        .insert({
          user_id: user.id,
          movie_id: id
        });

      if (insertError) {
        console.log('500 error', insertError);
        return NextResponse.json(
          { ok: false, message: '좋아요 추가 중 오류가 발생했습니다.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        ok: true, 
        message: '좋아요를 추가했습니다.',
        isLiked: true 
      });
    }
  } catch (error) {
    console.error('Like toggle error:', error);
    return NextResponse.json(
      { ok: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}