import { MovieCatalogClient } from "@/components/movie-catalog-client";
import { getFilteredMovies, parseFiltersFromParams } from "@/features/movie/filter-movie";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const filters = parseFiltersFromParams(params);

  const { movies, totalPages, currentPage } = await getFilteredMovies(filters);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Movies</h1>
        <p className="text-muted-foreground">Discover and explore thousands of movies from various genres and eras</p>
      </div>

      <MovieCatalogClient movies={movies} totalPages={totalPages} currentPage={currentPage} filters={filters} />
    </div>
  );
}
