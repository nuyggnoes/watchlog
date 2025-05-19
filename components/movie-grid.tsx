import { MovieCard } from "@/components/movie-card"

interface MovieGridProps {
  filter?: string
  showFilters?: boolean
}

export function MovieGrid({ filter = "popular", showFilters = true }: MovieGridProps) {
  // This would normally fetch data from an API based on the filter
  // For demo purposes, we'll use mock data
  const movies = [
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
      title: "Oppenheimer",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-07-21",
      rating: 8.5,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "3",
      title: "Poor Things",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-12-08",
      rating: 8.2,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "4",
      title: "The Batman",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2022-03-04",
      rating: 7.8,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "5",
      title: "Everything Everywhere All at Once",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2022-03-25",
      rating: 8.9,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "6",
      title: "Barbie",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-07-21",
      rating: 7.2,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "7",
      title: "Killers of the Flower Moon",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-10-20",
      rating: 7.7,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "8",
      title: "The Holdovers",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-12-27",
      rating: 7.9,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "9",
      title: "Past Lives",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-06-02",
      rating: 8.0,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "10",
      title: "The Zone of Interest",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-12-15",
      rating: 7.8,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "11",
      title: "Anatomy of a Fall",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-08-23",
      rating: 7.9,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "12",
      title: "The Boy and the Heron",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2023-12-08",
      rating: 7.6,
      isLiked: false,
      isBookmarked: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
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
  )
}
