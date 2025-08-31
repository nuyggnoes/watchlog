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
  console.log(id,'get')

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

    // 2. 각 리뷰의 작성자 정보 가져오기
    const reviewsWithProfiles = await Promise.all(
      (reviews || []).map(async (review) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, profile_image_url')
          .eq('user_id', review.user_id)
          .single();

        return {
          ...review,
          profiles: profile
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

    // 2. 작성자 정보 가져오기
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, profile_image_url')
      .eq('user_id', user.id)
      .single();

    const reviewWithProfile = {
      ...review,
      profiles: profile
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