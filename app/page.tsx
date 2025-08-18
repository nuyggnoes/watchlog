import { MovieGrid } from "@/components/movie-grid";
import { GenreFilter } from "@/components/genre-filter";
import { HeroSection } from "@/components/hero-section";
import { fetchPopularMovies } from "@/lib/movie/movie";
import { createClient } from "@/lib/supabase/serverClient";
import { Movie } from "@/types/movie";

export default async function Home() {
  const supabase = await createClient();
  const [
    movies,
    {
      data: { user },
    },
  ] = await Promise.all([fetchPopularMovies(), supabase.auth.getUser()]);

  let moviesWithLikes = movies;

  if (user) {
    const { data: likedMovies } = await supabase
      .from("movie_likes")
      .select("movie_id, created_at")
      .eq("user_id", user.id);

    const likedMovieMap = new Map(likedMovies?.map((like) => [like.movie_id, like.created_at]) || []);

    moviesWithLikes = movies.map((movie: Movie) => ({
      ...movie,
      isLiked: likedMovieMap.has(movie.id.toString()),
      likedAt: likedMovieMap.get(movie.id.toString()) || null,
    }));
  }

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
