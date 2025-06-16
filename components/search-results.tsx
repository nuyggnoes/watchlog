"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "@/components/movie-card";
import { Movie } from "@/types/movie";
import { Pagination } from "./pagination";
import MovieCardSkeleton from "./movie-card-skeleton";

interface SearchResultsProps {
  query: string;
  currentPage: number;
}

export function SearchResults({ query, currentPage }: SearchResultsProps) {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search-movie?query=${encodeURIComponent(query)}&page=${currentPage}`);
        const data = await res.json();
        setTotalPage(data.totalPages);
        setTotalResult(data.totalResults);
        setResults(data.results);
      } catch (err) {
        console.error("검색 실패:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Results for "{query}" <span className="text-muted-foreground">({totalResult})</span>
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              releaseDate={movie.releaseDate}
              rating={movie.rating}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found for "{query}"</p>
          <p className="mt-2 text-sm">Try different keywords or check for typos</p>
        </div>
      )}
      <Pagination totalPages={totalPage} currentPage={currentPage} />
    </div>
  );
}
