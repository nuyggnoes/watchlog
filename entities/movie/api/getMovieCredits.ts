import { tmdbFetch } from "../lib/tmdbClient";
import type { TMDBCredits } from "../lib/tmdbTypes";
import type { MovieCredits } from "../model/types";
import { mapTMDBMovieCredits } from "../lib/mapper";

export async function getMovieCredits(movieId: string): Promise<MovieCredits> {
  const data = await tmdbFetch<TMDBCredits>(`/movie/${movieId}/credits`, {
    language: "ko-KR",
  });

  return mapTMDBMovieCredits(data);
}
