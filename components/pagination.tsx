"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
  totalPages: number
  currentPage: number
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Current page neighborhood
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    // Add ellipsis indicators
    const result = []
    let prev = 0

    for (const page of pages) {
      if (prev && page - prev > 1) {
        result.push("ellipsis" + prev)
      }
      result.push(page)
      prev = page
    }

    return result
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => router.push(createPageURL(currentPage - 1))}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {pageNumbers.map((page, i) => {
        if (typeof page === "string" && page.startsWith("ellipsis")) {
          return (
            <Button key={page} variant="outline" size="icon" disabled>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More pages</span>
            </Button>
          )
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => router.push(createPageURL(page))}
          >
            {page}
            <span className="sr-only">Page {page}</span>
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => router.push(createPageURL(currentPage + 1))}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  )
}
