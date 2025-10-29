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
import {
  DEFAULT_FILTERS,
  LanguageCode,
  LANGUAGES,
  MovieFilters,
  SORT_OPTIONS,
  SortOption,
} from "@/features/movie/filter-movie";

interface FilterBarProps {
  filters: MovieFilters;
  onApplyFilters: (filters: MovieFilters) => void;
}

export function FilterBar({ filters, onApplyFilters }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [draftFilters, setDraftFilters] = useState(filters);

  const updateDraft = (field: keyof MovieFilters, value: any) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setActiveFilters([]);
    onApplyFilters(DEFAULT_FILTERS);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));

    const updated = { ...draftFilters };

    if (filter.startsWith("Sort:")) {
      updated.sortBy = DEFAULT_FILTERS.sortBy;
    } else if (filter.startsWith("Rating:")) {
      updated.ratingRange = DEFAULT_FILTERS.ratingRange;
    } else if (filter.startsWith("Year:")) {
      updated.yearRange = DEFAULT_FILTERS.yearRange;
    } else if (filter.startsWith("Lang:")) {
      updated.language = DEFAULT_FILTERS.language;
    }

    setDraftFilters(updated);
    onApplyFilters(updated);
  };

  const handleFilter = () => {
    onApplyFilters(draftFilters);
    const newActiveFilters: string[] = [];

    // Sort 표시
    const sortLabel = SORT_OPTIONS.find((opt) => opt.value === draftFilters.sortBy)?.label || draftFilters.sortBy;
    if (draftFilters.sortBy !== DEFAULT_FILTERS.sortBy) {
      newActiveFilters.push(`Sort: ${sortLabel}`);
    }

    // Rating 표시
    if (
      draftFilters.ratingRange[0] !== DEFAULT_FILTERS.ratingRange[0] ||
      draftFilters.ratingRange[1] !== DEFAULT_FILTERS.ratingRange[1]
    ) {
      newActiveFilters.push(`Rating: ${draftFilters.ratingRange.join(" ~ ")}`);
    }

    // Year 표시
    if (
      draftFilters.yearRange[0] !== DEFAULT_FILTERS.yearRange[0] ||
      draftFilters.yearRange[1] !== DEFAULT_FILTERS.yearRange[1]
    ) {
      newActiveFilters.push(`Year: ${draftFilters.yearRange.join(" ~ ")}`);
    }

    // Language 표시
    if (draftFilters.language && draftFilters.language !== DEFAULT_FILTERS.language) {
      const langLabel = LANGUAGES.find((lang) => lang.value === draftFilters.language)?.label || draftFilters.language;
      newActiveFilters.push(`Lang: ${langLabel}`);
    }

    setActiveFilters(newActiveFilters);
  };

  const handleQuickSort = (sortBy: SortOption) => {
    const updated = { ...filters, sortBy, page: 1 };
    onApplyFilters(updated);
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
                  <Select value={draftFilters.sortBy} onValueChange={(val) => updateDraft("sortBy", val as SortOption)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
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
                    min={0}
                    max={10}
                    step={1}
                    value={draftFilters.ratingRange}
                    onValueChange={(val) => updateDraft("ratingRange", val as [number, number])}
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
                    min={1900}
                    max={2025}
                    step={1}
                    value={draftFilters.yearRange}
                    onValueChange={(val) => updateDraft("yearRange", val as [number, number])}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Language</h3>
                  <Select
                    value={draftFilters.language}
                    onValueChange={(val) => updateDraft("language", val as LanguageCode)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
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

          {/* Quick Sort */}
          <Select value={filters.sortBy} onValueChange={(val) => handleQuickSort(val as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
