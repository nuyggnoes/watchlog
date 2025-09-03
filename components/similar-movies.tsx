import { MovieCard } from "@/components/movie-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchSimilarMovies } from "@/lib/movie/movie";
import { addLikeStatusToMovies } from "@/lib/movie/withLikes";

interface SimilarMoviesProps {
  movieId: string;
}

export async function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const movies = await fetchSimilarMovies(movieId);
  const moviesWithLikes = await addLikeStatusToMovies(movies);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Similar Movies</h2>

      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {moviesWithLikes.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              releaseDate={movie.releaseDate}
              rating={movie.rating}
              isLiked={movie.isLiked}
              className="w-[180px] shrink-0"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
