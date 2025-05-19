"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function FilterBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([0, 10])
  const [yearRange, setYearRange] = useState([1970, 2024])

  const clearFilters = () => {
    setActiveFilters([])
    setRatingRange([0, 10])
    setYearRange([1970, 2024])
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Movies</SheetTitle>
                <SheetDescription>Refine your movie selection with these filters</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <Select defaultValue="popularity">
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="rating">Rating (High to Low)</SelectItem>
                      <SelectItem value="release_date">Release Date (New to Old)</SelectItem>
                      <SelectItem value="title">Title (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Rating</h3>
                    <span className="text-xs text-muted-foreground">
                      {ratingRange[0]} - {ratingRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 10]}
                    min={0}
                    max={10}
                    step={0.5}
                    value={ratingRange}
                    onValueChange={setRatingRange}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Release Year</h3>
                    <span className="text-xs text-muted-foreground">
                      {yearRange[0]} - {yearRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[1970, 2024]}
                    min={1900}
                    max={2024}
                    step={1}
                    value={yearRange}
                    onValueChange={setYearRange}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Language</h3>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ko">Korean</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SheetFooter>
                <Button variant="outline" onClick={clearFilters}>
                  Reset Filters
                </Button>
                <Button>Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Select defaultValue="popularity">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating (High to Low)</SelectItem>
              <SelectItem value="release_date">Release Date (New to Old)</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">1,245 movies</div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button onClick={() => removeFilter(filter)}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {filter} filter</span>
              </button>
            </Badge>
          ))}

          <Button variant="link" size="sm" className="h-6 px-2" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
