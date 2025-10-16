import { getYear } from "@/lib/date";
import { LanguageCode, MovieFilters, SortOption } from "./filter-types";

export const DEFAULT_FILTERS: MovieFilters = {
  sortBy: "popularity",
  ratingRange: [0, 10],
  yearRange: [getYear() - 3, getYear()],
  language: "all",
  page: 1,
};

export const SORT_OPTIONS: { value: SortOption; label: string; tmdbValue: string }[] = [
  { value: "popularity", label: "Popularity", tmdbValue: "popularity.desc" },
  { value: "rating", label: "Rating (High to Low)", tmdbValue: "vote_average.desc" },
  { value: "release_date", label: "Release Date (New to Old)", tmdbValue: "primary_release_date.desc" },
  { value: "title", label: "Title (A-Z)", tmdbValue: "title.asc" },
];

export const LANGUAGES: { value: LanguageCode; label: string }[] = [
  { value: "all", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

// SortOption → TMDB API sort_by 파라미터 변환
export const SORT_BY_MAP: Record<SortOption, string> = {
  popularity: "popularity.desc",
  rating: "vote_average.desc",
  release_date: "primary_release_date.desc",
  title: "title.asc",
};
