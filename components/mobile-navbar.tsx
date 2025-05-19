import Link from "next/link"
import { Home, Search, Film, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavbarProps {
  className?: string
}

export function MobileNavbar({ className }: MobileNavbarProps) {
  return (
    <div className={cn("fixed bottom-0 left-0 right-0 border-t bg-background z-50", className)}>
      <div className="flex items-center justify-around h-16">
        <Link href="/" className="flex flex-col items-center justify-center w-1/4 h-full">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center justify-center w-1/4 h-full">
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link href="/movies" className="flex flex-col items-center justify-center w-1/4 h-full">
          <Film className="h-5 w-5" />
          <span className="text-xs mt-1">Movies</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center w-1/4 h-full">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  )
}
