import { MovieGrid } from "@/components/movie-grid";
import { GenreFilter } from "@/components/genre-filter";
import { HeroSection } from "@/components/hero-section";
import { fetchPopularMovies } from "@/lib/movie/movie";
import { addLikeStatusToMovies } from "@/lib/movie/withLikes";

export default async function Home() {
  const movies = await fetchPopularMovies();
  const moviesWithLikes = await addLikeStatusToMovies(movies);

  return (
    <div className="space-y-8">
      <HeroSection />
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Movies</h2>
          {/* <GenreFilter /> */}
        </div>
        <MovieGrid movies={moviesWithLikes} />
      </section>
    </div>
  );
}
