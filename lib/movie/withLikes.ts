import { Movie } from "@/types/movie";
import { createClient } from "@/lib/supabase/serverClient";

export async function addLikeStatusToMovies(movies: Movie[]): Promise<Movie[]> {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return movies;
  }

  const { data: likedMovies } = await supabase
    .from("movie_likes")
    .select("movie_id, created_at")
    .eq("user_id", user.id);

  const likedMovieMap = new Map(
    likedMovies?.map((like) => [like.movie_id, like.created_at]) || []
  );

  return movies.map((movie: Movie) => ({
    ...movie,
    isLiked: likedMovieMap.has(movie.id.toString()),
    likedAt: likedMovieMap.get(movie.id.toString()) || null,
  }));
}