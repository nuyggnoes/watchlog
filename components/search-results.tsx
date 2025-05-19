import { MovieCard } from "@/components/movie-card"

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  // This would normally fetch data from an API based on the query
  // For demo purposes, we'll use mock data
  const results = [
    {
      id: "1",
      title: "Dune: Part Two",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2024-03-01",
      rating: 8.7,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "2",
      title: "Dune",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2021-10-22",
      rating: 8.1,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "3",
      title: "Dune (1984)",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "1984-12-14",
      rating: 6.5,
      isLiked: false,
      isBookmarked: false,
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Results for "{query}" <span className="text-muted-foreground">({results.length})</span>
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              releaseDate={movie.releaseDate}
              rating={movie.rating}
              isLiked={movie.isLiked}
              isBookmarked={movie.isBookmarked}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found for "{query}"</p>
          <p className="mt-2 text-sm">Try different keywords or check for typos</p>
        </div>
      )}
    </div>
  )
}
