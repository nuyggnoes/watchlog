import { ApiResponse } from "@/types/api/api";

export interface LikeReviewResponse {
  liked: boolean;
  message: string;
}

export interface ReviewLikeStatus {
  likes_count: number;
  is_liked_by_user: boolean;
}

export async function toggleReviewLike(reviewId: string): Promise<ApiResponse<LikeReviewResponse>> {
  try {
    const response = await fetch(`/api/reviews/${reviewId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        message: result.message || '좋아요 처리 중 오류가 발생했습니다.',
      };
    }

    return {
      ok: true,
      data: {
        liked: result.liked,
        message: result.message,
      },
    };
  } catch (error) {
    console.error('Toggle review like error:', error);
    return {
      ok: false,
      message: '네트워크 오류가 발생했습니다.',
    };
  }
}

export async function getReviewLikeStatus(reviewId: string): Promise<ApiResponse<ReviewLikeStatus>> {
  try {
    const response = await fetch(`/api/reviews/${reviewId}/like`, {
      method: 'GET',
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        message: result.message || '좋아요 상태 조회 중 오류가 발생했습니다.',
      };
    }

    return {
      ok: true,
      data: {
        likes_count: result.likes_count,
        is_liked_by_user: result.is_liked_by_user,
      },
    };
  } catch (error) {
    console.error('Get review like status error:', error);
    return {
      ok: false,
      message: '네트워크 오류가 발생했습니다.',
    };
  }
}