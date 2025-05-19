import { GenreCard } from "@/components/genre-card"
import { Separator } from "@/components/ui/separator"

export default function GenresPage() {
  // This would normally come from an API
  const genres = [
    {
      id: "action",
      name: "Action",
      description: "Exciting sequences and high-energy scenes",
      count: 1245,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "adventure",
      name: "Adventure",
      description: "Exciting stories, often with new experiences or exotic locales",
      count: 875,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "animation",
      name: "Animation",
      description: "Films created with animated images or CGI",
      count: 642,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "comedy",
      name: "Comedy",
      description: "Films designed to make the audience laugh",
      count: 1532,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "crime",
      name: "Crime",
      description: "Films that focus on criminal acts and the justice system",
      count: 784,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "documentary",
      name: "Documentary",
      description: "Non-fictional films intended to document reality",
      count: 523,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "drama",
      name: "Drama",
      description: "Character development and emotional themes",
      count: 2156,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "family",
      name: "Family",
      description: "Films suitable for all age groups",
      count: 478,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "fantasy",
      name: "Fantasy",
      description: "Films with magical and supernatural elements",
      count: 562,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "horror",
      name: "Horror",
      description: "Films that seek to elicit fear and terror",
      count: 892,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "sci-fi",
      name: "Science Fiction",
      description: "Speculative fiction with scientific themes",
      count: 723,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "thriller",
      name: "Thriller",
      description: "Suspenseful and exciting plots",
      count: 945,
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Group genres into rows of 3 for desktop view
  const genreRows = []
  for (let i = 0; i < genres.length; i += 3) {
    genreRows.push(genres.slice(i, i + 3))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Movie Genres</h1>
        <p className="text-muted-foreground">Explore movies by your favorite genres and discover new films</p>
      </div>

      <Separator />

      <div className="space-y-12">
        {genreRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {row.map((genre) => (
              <GenreCard
                key={genre.id}
                id={genre.id}
                name={genre.name}
                description={genre.description}
                count={genre.count}
                image={genre.image}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
