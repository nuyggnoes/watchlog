"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { ReviewCard } from "@/components/review-card";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { ReviewWithUser } from "@/types/review";
import { createReview } from "@/lib/review/review";

interface ReviewSectionProps {
  movieId: string;
  initialReviews?: ReviewWithUser[];
}

export function ReviewSection({ movieId, initialReviews = [] }: ReviewSectionProps) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<ReviewWithUser[]>(initialReviews);
  const requireAuth = useRequireAuth();

  const handleSubmitReview = async () => {
    const session = await requireAuth();
    if (!session) {
      return;
    }

    try {
      const result = await createReview(movieId, {
        rating,
        body: reviewText,
      });

      if (result.ok) {
        alert(result.message || "리뷰가 작성되었습니다.");

        if (result.data) {
          setReviews((prevReviews) => [result.data, ...prevReviews]);
        }

        setReviewText("");
        setRating(0);
      } else {
        alert(result.message || "리뷰 작성에 실패했습니다.");
      }
    } catch (err) {
      console.error("Review submission error:", err);
      alert(err instanceof Error ? err.message : "네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>

      {/* Write a review */}
      <div className="space-y-4 p-4 border rounded-lg">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Write a review</p>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="p-0.5">
                  <Star className={`h-4 w-4 ${rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <Textarea
          placeholder="Share your thoughts on this movie..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={3}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmitReview} disabled={!reviewText.trim() || rating === 0}>
            Post Review
          </Button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
