import { MovieGrid } from "@/components/movie-grid"
import { FilterBar } from "@/components/filter-bar"
import { Pagination } from "@/components/pagination"

export default function MoviesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Movies</h1>
        <p className="text-muted-foreground">Discover and explore thousands of movies from various genres and eras</p>
      </div>

      <FilterBar />

      <MovieGrid filter="all" showFilters={false} />

      <Pagination totalPages={10} currentPage={1} />
    </div>
  )
}
