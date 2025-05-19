import { MovieCard } from "@/components/movie-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface SimilarMoviesProps {
  movieId: string
}

export function SimilarMovies({ movieId }: SimilarMoviesProps) {
  // This would normally fetch data from an API
  // For demo purposes, we'll use mock data
  const movies = [
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
      title: "Blade Runner 2049",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2017-10-06",
      rating: 8.0,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "4",
      title: "Arrival",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2016-11-11",
      rating: 7.9,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "5",
      title: "Interstellar",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2014-11-07",
      rating: 8.6,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "6",
      title: "Foundation",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2021-09-24",
      rating: 7.4,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "7",
      title: "The Expanse",
      posterPath: "/placeholder.svg?height=450&width=300",
      releaseDate: "2015-12-14",
      rating: 8.5,
      isLiked: false,
      isBookmarked: true,
    },
  ]

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Similar Movies</h2>

      <ScrollArea>
        <div className="flex space-x-4 pb-4">
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
              className="w-[180px] shrink-0"
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
