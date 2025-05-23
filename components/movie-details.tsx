import Image from "next/image";
import { Star, Clock, Calendar, Heart, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MovieDetailsProps {
  id: string;
}

export function MovieDetails({ id }: MovieDetailsProps) {
  // This would normally fetch data from an API
  // For demo purposes, we'll use mock data
  const movie = {
    id,
    title: "Dune: Part Two",
    posterPath: "/placeholder.svg?height=600&width=400",
    backdropPath: "/placeholder.svg?height=800&width=1600",
    releaseDate: "2024-03-01",
    runtime: 166,
    rating: 8.7,
    overview:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. As he starts to gain the Fremen's trust, he must choose between the love of his life and the fate of the universe.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    isLiked: false,
    isBookmarked: true,
  };

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
                <span>{movie.rating.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(movie.releaseDate).getFullYear()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="mt-4 text-muted-foreground">{movie.overview}</p>

            <div className="mt-4">
              <p>
                <span className="font-medium">Director:</span> {movie.director}
              </p>
              <p className="mt-1">
                <span className="font-medium">Cast:</span> {movie.cast.join(", ")}
              </p>
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
