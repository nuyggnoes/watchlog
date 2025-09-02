"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ReviewWithLikes } from "@/types/review";
import { toggleReviewLike } from "@/lib/review/like";

interface ReviewCardProps {
  review: ReviewWithLikes;
}

export function ReviewCard({ review }: ReviewCardProps) {
  console.log(review);
  const [isLiked, setIsLiked] = useState(review.is_liked_by_user);
  const [likesCount, setLikesCount] = useState(review.likes_count);
  const [isLoading, setIsLoading] = useState(false);

  const handleReviewLike = async () => {
    if (isLoading) return; // 중복 요청 방지

    setIsLoading(true);

    // 1. 즉시 UI 업데이트 (낙관적 업데이트)
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likesCount + 1 : likesCount - 1;

    setIsLiked(newIsLiked);
    setLikesCount(newLikesCount);

    try {
      // 2. 서버 요청
      const result = await toggleReviewLike(review.id);

      if (!result.ok) {
        // 3. 실패시 롤백
        setIsLiked(!newIsLiked);
        setLikesCount(!newIsLiked ? likesCount + 1 : likesCount - 1);

        // 에러 처리 (선택적으로 토스트 메시지 등)
        console.error("좋아요 요청 실패:", result.message);
      }
    } catch (error) {
      // 4. 네트워크 에러시에도 롤백
      setIsLiked(!newIsLiked);
      setLikesCount(!newIsLiked ? likesCount + 1 : likesCount - 1);
      console.error("좋아요 요청 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={review.profiles?.profile_image_url} alt={review.profiles?.name} />
          <AvatarFallback>{review.profiles?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{review.profiles?.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-2 text-sm">{review.body}</p>

          <div className="flex items-center gap-4 mt-3">
            <Button
              onClick={handleReviewLike}
              variant="ghost"
              size="sm"
              className={`gap-1 h-8 ${isLiked ? "text-blue-600 bg-blue-50 hover:bg-blue-100" : ""}`}
              disabled={isLoading}>
              <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{likesCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 h-8">
              <MessageSquare className="h-4 w-4" />
              <span>0</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
