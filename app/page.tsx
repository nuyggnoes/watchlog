import { MovieGrid } from "@/components/movie-grid";
import { GenreFilter } from "@/components/genre-filter";
import { HeroSection } from "@/components/hero-section";
import { getCurrentUser } from "@/features/auth/services/session";
import { getUserLikes } from "@/features/movie-like/api/get-user-likes";
import { getPopularMovies } from "@/entities/movie";

export default async function Home() {
  const user = await getCurrentUser();
  const movies = await getPopularMovies();
  const userLikes = user ? await getUserLikes(user.id) : new Set<string>();

  return (
    <div className="space-y-8">
      <HeroSection />
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Movies</h2>
          {/* <GenreFilter /> */}
        </div>
        <MovieGrid movies={movies} userLikes={userLikes} />
      </section>
    </div>
  );
}
