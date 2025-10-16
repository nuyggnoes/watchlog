export type MovieFilters = {
  sortBy: SortOption;
  ratingRange: [number, number];
  yearRange: [number, number];
  language: LanguageCode;
  page: number;
};

export type SortOption = "popularity" | "rating" | "release_date" | "title";

export type LanguageCode = "all" | "en" | "ko" | "ja" | "fr" | "es";

export type FilteredMoviesResult = {
  movies: import("../../../../entities/movie/model/types").Movie[];
  totalPages: number;
  totalResults: number;
  currentPage: number;
};

export type MovieFilterParams = {
  sort?: string;
  rating?: string;
  year?: string;
  lang?: string;
  page?: string;
};
