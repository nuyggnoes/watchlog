"use client";

import { MovieGrid } from "@/components/movie-grid";
import { FilterBar } from "@/components/filter-bar";
import { Pagination } from "@/components/pagination";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import { sortByMap } from "@/lib/movie/sortMap";
import { useSearchParams } from "next/navigation";
import MovieCardSkeleton from "@/components/movie-card-skeleton";
import { getYear } from "@/lib/date";

export default function MoviesPage() {
  const year = getYear();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "popularity",
    ratingRange: [0, 10] as [number, number],
    yearRange: [year - 3, year] as [number, number],
    language: "",
  });
  const [totalPage, setTotalPage] = useState(0);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  useEffect(() => {
    const { sortBy, ratingRange, yearRange, language } = filters;
    const sortParam = sortByMap[sortBy];
    const url =
      `/api/filtered-movie?sort=${encodeURIComponent(sortParam)}&page=${currentPage}` +
      `&ratingMin=${ratingRange[0]}&ratingMax=${ratingRange[1]}` +
      `&yearMin=${yearRange[0]}&yearMax=${yearRange[1]}` +
      `&language=${language}`;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTotalPage(data.totalPages);
        setMovies(data.movies);
        setLoading(false);
      });
  }, [filters, currentPage]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Movies</h1>
        <p className="text-muted-foreground">Discover and explore thousands of movies from various genres and eras</p>
      </div>

      <FilterBar
        sort={filters.sortBy}
        onSortChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}

      <Pagination totalPages={totalPage} currentPage={currentPage} />
    </div>
  );
}
