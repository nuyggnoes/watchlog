"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function GenreFilter() {
  const [selectedGenre, setSelectedGenre] = useState<string>("all")

  const genres = [
    { id: "all", name: "All" },
    { id: "action", name: "Action" },
    { id: "adventure", name: "Adventure" },
    { id: "animation", name: "Animation" },
    { id: "comedy", name: "Comedy" },
    { id: "crime", name: "Crime" },
    { id: "documentary", name: "Documentary" },
    { id: "drama", name: "Drama" },
    { id: "family", name: "Family" },
    { id: "fantasy", name: "Fantasy" },
    { id: "horror", name: "Horror" },
    { id: "sci-fi", name: "Sci-Fi" },
    { id: "thriller", name: "Thriller" },
  ]

  return (
    <ScrollArea className="w-full max-w-[600px] whitespace-nowrap">
      <div className="flex space-x-2 pb-2">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={selectedGenre === genre.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedGenre(genre.id)}
            className="rounded-full"
          >
            {genre.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
