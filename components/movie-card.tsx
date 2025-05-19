"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Bookmark, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/movie";

interface MovieCardProps extends Movie {
  className?: string;
}

export function MovieCard({
  id,
  title,
  posterPath,
  releaseDate,
  rating,
  className,
  isLiked = false,
  isBookmarked = false,
}: MovieCardProps) {
  const year = new Date(releaseDate).getFullYear();

  return (
    <div className={cn("group relative overflow-hidden rounded-lg", className)}>
      <Link href={`/movies/${id}`} className="block">
        <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
          <Image
            src={posterPath || "/placeholder.svg?height=450&width=300"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent">
        <Link href={`/movies/${id}`}>
          <h3 className="font-medium text-white line-clamp-1">{title}</h3>
        </Link>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-300">{year}</span>
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-xs text-gray-300">{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:text-rose-500 hover:bg-transparent">
              <Heart className={cn("h-4 w-4", isLiked && "fill-rose-500 text-rose-500")} />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:text-blue-500 hover:bg-transparent">
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-blue-500 text-blue-500")} />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
