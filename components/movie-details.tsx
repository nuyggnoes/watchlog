import Image from "next/image";
import { Star, Clock, Calendar, Heart, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchMovieDetails } from "@/lib/movie/fetchMovieDetails";
import { TrailerButton } from "./\btrailer-button";

interface MovieDetailsProps {
  id: string;
}

export async function MovieDetails({ id }: MovieDetailsProps) {
  const { movie, director, topCast } = await fetchMovieDetails(id);

  return (
    <div className="relative">
      {/* Backdrop Image */}
      <div className="relative w-full h-[30vh] md:h-[50vh] overflow-hidden rounded-xl">
        <Image
          src={movie.backdropPath || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      </div>

      {/* Movie Info */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 -mt-20 md:-mt-32 relative z-10">
          {/* Poster */}
          <div className="shrink-0 w-32 md:w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-lg border border-border/50">
            <Image
              src={movie.posterPath || "/placeholder.svg"}
              alt={movie.title}
              width={300}
              height={450}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 pt-4">
            <h1 className="text-2xl md:text-4xl font-bold">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((genre: any) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <p className="mt-4 text-muted-foreground">{movie.overview}</p>
            <br />
            {movie.trailer && <TrailerButton trailerUrl={movie.trailer} />}
            <br />
            <div className="mt-4">
              <div className="flex items-center gap-3 mt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border">
                  <Image
                    src={director.profile || "/placeholder-logo.svg"}
                    alt={director.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">감독</p>
                  <p className="text-base font-medium">{director.name || "감독 정보 없음"}</p>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">배우</h2>
                <div className="flex gap-4 overflow-x-auto">
                  {topCast.map((actor, i) => (
                    <div key={i} className="flex flex-col items-center text-center min-w-[80px]">
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-border">
                        <Image
                          src={actor.profile}
                          alt={actor.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="mt-1 text-sm font-medium">{actor.name}</span>
                      <span className="text-xs text-muted-foreground">{actor.character}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button className="gap-2">
                <Heart className="h-4 w-4" />
                {movie.isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" className="gap-2">
                <Bookmark className={`h-4 w-4 ${movie.isBookmarked ? "fill-current" : ""}`} />
                {movie.isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
