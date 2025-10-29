import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Movie } from "@/entities/movie/model/types";
import { LikeButton } from "@/features/movie-like/ui/like-button";

interface MovieCardProps {
  movie: Movie;
  isLiked?: boolean;
  className?: string;
}

export function MovieCard({ movie, isLiked = false, className }: MovieCardProps) {
  const { id, title, posterPath, releaseDate, rating } = movie;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "Unknown";

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
            <LikeButton movieId={id} initialIsLiked={isLiked} />
          </div>
        </div>
      </div>
    </div>
  );
}
