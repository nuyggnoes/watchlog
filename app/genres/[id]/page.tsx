import { MovieGrid } from "@/components/movie-grid"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { FilterBar } from "@/components/filter-bar"
import { Pagination } from "@/components/pagination"

export default function GenrePage({ params }: { params: { id: string } }) {
  // This would normally come from an API
  const genres = {
    action: {
      name: "Action",
      description:
        "Action films are a genre of film in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
    },
    adventure: {
      name: "Adventure",
      description:
        "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way.",
    },
    animation: {
      name: "Animation",
      description: "Animation is a method in which figures are manipulated to appear as moving images.",
    },
    comedy: {
      name: "Comedy",
      description:
        "Comedy films are designed to make the audience laugh through amusing situations, clean language, and lighthearted plots.",
    },
    crime: {
      name: "Crime",
      description:
        "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre.",
    },
    documentary: {
      name: "Documentary",
      description:
        "A documentary film is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education, or maintaining a historical record.",
    },
    drama: {
      name: "Drama",
      description:
        "Drama films are a genre of film that rely on the emotional and relational development of realistic characters.",
    },
    family: {
      name: "Family",
      description:
        "Family films are made for a wide audience. These films can be enjoyed by children but are intended for a broad audience of adults and children alike.",
    },
    fantasy: {
      name: "Fantasy",
      description:
        "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.",
    },
    horror: {
      name: "Horror",
      description:
        "Horror films are designed to frighten and to invoke our hidden worst fears, often in a terrifying, shocking finale.",
    },
    "sci-fi": {
      name: "Science Fiction",
      description:
        "Science fiction films are films that often use speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.",
    },
    thriller: {
      name: "Thriller",
      description:
        "Thriller films are a genre of film that uses suspense, tension and excitement as its main elements.",
    },
  }

  const genre = genres[params.id as keyof typeof genres] || {
    name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
    description: "Explore movies in this genre",
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/genres">
          <Button variant="ghost" size="sm" className="mb-4">
            <ChevronLeft className="mr-1 h-4 w-4" />
            All Genres
          </Button>
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{genre.name} Movies</h1>
          <p className="text-muted-foreground max-w-3xl">{genre.description}</p>
        </div>
      </div>

      <FilterBar />

      <MovieGrid filter={params.id} showFilters={false} />

      <Pagination totalPages={10} currentPage={1} />
    </div>
  )
}
