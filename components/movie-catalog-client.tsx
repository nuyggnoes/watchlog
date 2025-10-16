"use client";

import { useRouter } from "next/navigation";
import { FilterBar } from "@/components/filter-bar";
import { MovieGrid } from "@/components/movie-grid";
import { Pagination } from "@/components/pagination";
import type { Movie } from "@/entities/movie";
import { buildFilterParams, MovieFilters } from "@/features/movie/filter-movie";

interface MovieCatalogClientProps {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  filters: MovieFilters;
}

export function MovieCatalogClient({ movies, totalPages, currentPage, filters }: MovieCatalogClientProps) {
  const router = useRouter();

  const handleApplyFilters = (newFilters: MovieFilters) => {
    const params = buildFilterParams({ ...newFilters, page: 1 });
    router.push(`/movies?${params.toString()}`);
  };

  return (
    <>
      <FilterBar filters={filters} onApplyFilters={handleApplyFilters} />
      <MovieGrid movies={movies} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
