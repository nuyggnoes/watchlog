import { buildTMDBQueryParams } from "../lib/filter-utils";
import { FilteredMoviesResult, MovieFilters } from "../model/filter-types";
import { mapTMDBMovie } from "../../../../entities/movie/api/mapper";
import { tmdbFetch } from "../../../../entities/movie/api/tmdb-client";
import { TMDBMovie } from "../../../../entities/movie/api/tmdb-types";

type TMDBDiscoverResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

export async function getFilteredMovies(filters: MovieFilters): Promise<FilteredMoviesResult> {
  const queryParams = buildTMDBQueryParams(filters);

  const response = await tmdbFetch<TMDBDiscoverResponse>(`/discover/movie?${queryParams.toString()}`);

  const movies = response.results.map(mapTMDBMovie);

  return {
    movies,
    totalPages: response.total_pages,
    totalResults: response.total_results,
    currentPage: response.page,
  };
}
