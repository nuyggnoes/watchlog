"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getYear } from "@/lib/date";

interface Filters {
  sortBy: string;
  ratingRange: [number, number];
  yearRange: [number, number];
  language: string;
}

interface FilterBarProps {
  sort: string;
  onSortChange: (value: string) => void;
  filters: Filters;
  onApplyFilters: (filters: Filters) => void;
}

export function FilterBar({ sort, filters, onSortChange, onApplyFilters }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [draftFilters, setDraftFilters] = useState(filters);
  const year = getYear();

  const updateDraft = (field: keyof Filters, value: any) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    const reset: Filters = {
      sortBy: "popularity",
      ratingRange: [0, 10],
      yearRange: [year - 3, year],
      language: "",
    };
    setDraftFilters(reset);
    setActiveFilters([]);
    onApplyFilters(reset);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));

    const updated = { ...draftFilters };

    if (filter.startsWith("Sort:")) {
      updated.sortBy = "popularity";
    } else if (filter.startsWith("Rating:")) {
      updated.ratingRange = [0, 10];
    } else if (filter.startsWith("Year:")) {
      updated.yearRange = [1970, 2025];
    } else if (filter.startsWith("Lang:")) {
      updated.language = "";
    }

    setDraftFilters(updated);
    onApplyFilters(updated);
  };

  const handleFilter = () => {
    onApplyFilters(draftFilters);
    setActiveFilters([
      `Sort: ${draftFilters.sortBy}`,
      `Rating: ${draftFilters.ratingRange.join(" ~ ")}`,
      `Year: ${draftFilters.yearRange.join(" ~ ")}`,
      `Lang: ${draftFilters.language}`,
    ]);
  };

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
                  <Select
                    defaultValue="popularity"
                    value={draftFilters.sortBy}
                    onValueChange={(val) => updateDraft("sortBy", val)}>
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
                      {draftFilters.ratingRange[0]} - {draftFilters.ratingRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 10]}
                    min={0}
                    max={10}
                    step={1}
                    value={draftFilters.ratingRange}
                    onValueChange={(val) => updateDraft("ratingRange", val)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Release Year</h3>
                    <span className="text-xs text-muted-foreground">
                      {draftFilters.yearRange[0]} - {draftFilters.yearRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[1970, 2025]}
                    min={1900}
                    max={2025}
                    step={1}
                    value={draftFilters.yearRange}
                    onValueChange={(val) => updateDraft("yearRange", val)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Language</h3>
                  <Select
                    defaultValue="ko"
                    value={draftFilters.language}
                    onValueChange={(val) => updateDraft("language", val)}>
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
                <Button onClick={handleFilter}>Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Select defaultValue="popularity" value={sort} onValueChange={onSortChange}>
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

        {/* <div className="text-sm text-muted-foreground">1,245 movies</div> */}
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
  );
}
