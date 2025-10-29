import { buildTMDBQueryParams } from "../lib/filter-utils";
import { FilteredMoviesResult, MovieFilters } from "../model/filter-types";
import { mapTMDBMovie } from "../../../../entities/movie/lib/mapper";
import { tmdbFetch } from "../../../../entities/movie/lib/tmdbClient";
import { TMDBMovie } from "../../../../entities/movie/lib/tmdbTypes";

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
