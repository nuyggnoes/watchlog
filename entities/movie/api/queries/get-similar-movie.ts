import { Movie } from "../../model/types";
import { mapTMDBMovie } from "../mapper";
import { tmdbFetch } from "../tmdb-client";
import { TMDBMovie } from "../tmdb-types";

interface SimilarMovieResponse {
  results: TMDBMovie[];
}

export async function getSimilarMovies(id: string): Promise<Movie[]> {
  const data = await tmdbFetch<SimilarMovieResponse>(`/movie/${id}/similar`, { language: "ko-KR" });
  return data.results.map(mapTMDBMovie);
}
