import { getYear } from "@/lib/date";
import { DEFAULT_FILTERS, SORT_BY_MAP } from "../model/filter-constants";
import { MovieFilterParams, MovieFilters, SortOption } from "../model/filter-types";

// URL searchParams를 MovieFilters 객체로 변환
export function parseFiltersFromParams(params: MovieFilterParams): MovieFilters {
  const sort = (params.sort as SortOption) || DEFAULT_FILTERS.sortBy;
  const page = parseInt(params.page || "1", 10);

  const ratingRange = params.rating
    ? (params.rating.split("-").map(Number) as [number, number])
    : DEFAULT_FILTERS.ratingRange;

  const yearRange = params.year ? (params.year.split("-").map(Number) as [number, number]) : DEFAULT_FILTERS.yearRange;

  const language = (params.lang as MovieFilters["language"]) || DEFAULT_FILTERS.language;

  return {
    sortBy: sort,
    ratingRange,
    yearRange,
    language,
    page,
  };
}

// MovieFilters 객체를 URL searchParams로 변환
export function buildFilterParams(filters: MovieFilters): URLSearchParams {
  const params = new URLSearchParams();

  params.set("sort", filters.sortBy);
  params.set("rating", `${filters.ratingRange[0]}-${filters.ratingRange[1]}`);
  params.set("year", `${filters.yearRange[0]}-${filters.yearRange[1]}`);

  if (filters.language && filters.language !== "all") {
    params.set("lang", filters.language);
  }

  params.set("page", filters.page.toString());

  return params;
}

// MovieFilters를 TMDB API query params로 변환
export function buildTMDBQueryParams(filters: MovieFilters): URLSearchParams {
  const query = new URLSearchParams({
    sort_by: SORT_BY_MAP[filters.sortBy],
    include_adult: "false",
    include_video: "false",
    language: "ko-KR",
    page: filters.page.toString(),
    "vote_average.gte": filters.ratingRange[0].toString(),
    "vote_average.lte": filters.ratingRange[1].toString(),
    "primary_release_date.gte": `${filters.yearRange[0]}-01-01`,
    "primary_release_date.lte": `${filters.yearRange[1]}-12-31`,
  });

  if (filters.language && filters.language !== "all") {
    query.set("with_original_language", filters.language);
  }

  return query;
}

// 필터가 기본값인지 확인
export function isDefaultFilters(filters: MovieFilters): boolean {
  const year = getYear();
  return (
    filters.sortBy === DEFAULT_FILTERS.sortBy &&
    filters.ratingRange[0] === DEFAULT_FILTERS.ratingRange[0] &&
    filters.ratingRange[1] === DEFAULT_FILTERS.ratingRange[1] &&
    filters.yearRange[0] === year - 3 &&
    filters.yearRange[1] === year &&
    filters.language === DEFAULT_FILTERS.language
  );
}
