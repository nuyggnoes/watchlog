import { Movie } from "../../model/types";
import { mapTMDBMovie } from "../mapper";
import { tmdbFetch } from "../tmdb-client";
import { TMDBMovie } from "../tmdb-types";

interface PopularMoviesResponse {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
}

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const data = await tmdbFetch<PopularMoviesResponse>("/movie/popular", {
    language: "ko-KR",
    page: String(page),
  });

  return data.results.map(mapTMDBMovie);
}
