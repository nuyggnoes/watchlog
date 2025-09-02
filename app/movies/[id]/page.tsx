import { MovieDetails } from "@/components/movie-details";
import { ReviewSection } from "@/components/review-section";
import { SimilarMovies } from "@/components/similar-movies";
import { createClient } from "@/lib/supabase/serverClient";
import { ReviewWithLikes } from "@/types/review";
import { User } from "@supabase/supabase-js";

async function getMovieReviews(movieId: string, supabase: any, user: User | null): Promise<ReviewWithLikes[]> {
  try {
    // 1. 리뷰 데이터 가져오기
    const { data: reviews, error } = await supabase
      .from("movie_reviews")
      .select("*")
      .eq("movie_id", movieId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Review fetch error:", error);
      return [];
    }

    // 2. 각 리뷰의 작성자 정보와 좋아요 정보 가져오기
    const reviewsWithProfiles = await Promise.all(
      (reviews || []).map(async (review) => {
        // 프로필 정보 가져오기
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("name, profile_image_url")
          .eq("user_id", review.user_id)
          .maybeSingle();

        if (profileError) {
          console.log("Profile error for user_id", review.user_id, ":", profileError);
        }

        // 좋아요 수 가져오기
        const { count: likesCount, error: likesError } = await supabase
          .from("review_likes")
          .select("*", { count: "exact", head: true })
          .eq("review_id", review.id);

        if (likesError) {
          console.log("Likes count error for review_id", review.id, ":", likesError);
        }

        // 현재 사용자의 좋아요 상태 확인
        let isLikedByUser = false;
        if (user) {
          const { data: userLike, error: userLikeError } = await supabase
            .from("review_likes")
            .select("id")
            .eq("review_id", review.id)
            .eq("user_id", user.id)
            .maybeSingle();

          isLikedByUser = !!userLike;

          if (userLikeError) {
            console.log("User like check error for review_id", review.id, ":", userLikeError);
          }
        }

        return {
          ...review,
          profiles: profile || { name: "Anonymous", profile_image_url: null },
          likes_count: likesCount || 0,
          is_liked_by_user: isLikedByUser,
        };
      })
    );
    return reviewsWithProfiles;
  } catch (error) {
    console.error("Review fetch error:", error);
    return [];
  }
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const reviews = await getMovieReviews(id, supabase, user);

  return (
    <div className="space-y-8">
      <MovieDetails id={id} />
      <ReviewSection movieId={id} initialReviews={reviews} />
      <SimilarMovies movieId={id} />
    </div>
  );
}
