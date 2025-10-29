import { MovieCard } from "@/components/movie-card";
import { Movie } from "@/entities/movie";

interface Props {
  movies: Movie[];
  userLikes?: Set<string>;
}

export function MovieGrid({ movies, userLikes }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => {
        const isLiked = userLikes?.has(movie.id);
        return <MovieCard key={movie.id} movie={movie} isLiked={isLiked} />;
      })}
    </div>
  );
}
