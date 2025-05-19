import { SearchBar } from "@/components/search-bar"
import { SearchResults } from "@/components/search-results"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search Movies</h1>
      <SearchBar initialQuery={query} />
      {query && <SearchResults query={query} />}
    </div>
  )
}
