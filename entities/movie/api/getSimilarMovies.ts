import { Movie } from "../model/types";
import { mapTMDBMovie } from "../lib/mapper";
import { tmdbFetch } from "../lib/tmdbClient";
import { TMDBMovie } from "../lib/tmdbTypes";

interface SimilarMovieResponse {
  results: TMDBMovie[];
}

export async function getSimilarMovies(id: string): Promise<Movie[]> {
  const data = await tmdbFetch<SimilarMovieResponse>(`/movie/${id}/similar`, { language: "ko-KR" });
  return data.results.map(mapTMDBMovie);
}
