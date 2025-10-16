"use client";

import { useState, useTransition, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleLike } from "../api/toggle-like";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  movieId: string;
  initialIsLiked: boolean;
  className?: string;
}

export function LikeButton({ movieId, initialIsLiked, className }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const previousState = isLiked;
    setIsLiked(!isLiked);

    startTransition(async () => {
      try {
        const result = await toggleLike(movieId);
        setIsLiked(result.isLiked);
      } catch (error) {
        setIsLiked(previousState);

        if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
          router.push("/login");
        } else {
          console.error("좋아요 처리 실패:", error);
        }
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7 text-white hover:text-rose-500 hover:bg-transparent", className)}
      onClick={handleLike}
      disabled={isPending}>
      <Heart className={cn("h-4 w-4", isLiked && "fill-rose-500 text-rose-500")} />
      <span className="sr-only">Like</span>
    </Button>
  );
}
