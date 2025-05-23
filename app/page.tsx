import { MovieGrid } from "@/components/movie-grid";
import { GenreFilter } from "@/components/genre-filter";
import { HeroSection } from "@/components/hero-section";
import { fetchPopularMovies } from "@/lib/movie/movie";

export default async function Home() {
  const movies = await fetchPopularMovies();
  return (
    <div className="space-y-8">
      <HeroSection />
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Movies</h2>
          {/* <GenreFilter /> */}
        </div>
        <MovieGrid movies={movies} />
      </section>
    </div>
  );
}
