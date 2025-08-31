"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ReviewWithUser } from "@/types/review";

interface ReviewCardProps {
  review: ReviewWithUser;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={review.profiles?.profile_image_url} alt={review.profiles?.name} />
          20 + <AvatarFallback>{review.profiles?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
            <Button variant="ghost" size="sm" className="gap-1 h-8">
              <ThumbsUp className="h-4 w-4" />
              <span>0</span>
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
