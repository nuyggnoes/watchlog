import { SearchBar } from "@/components/search-bar";
import { SearchResults } from "@/components/search-results";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  const { q, page } = await searchParams;
  const query = q ?? "";
  const currentPage = Number(page ?? "1");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search Movies</h1>
      <SearchBar initialQuery={query} />
      {query && <SearchResults query={query} currentPage={currentPage} />}
    </div>
  );
}
