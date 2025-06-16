import Link from "next/link";
import { Search, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "./search-bar";

interface DesktopNavbarProps {
  className?: string;
}

export function DesktopNavbar({ className }: DesktopNavbarProps) {
  // For demo purposes, assume user is not logged in
  const isLoggedIn = false;

  return (
    <header className={cn("w-full border-b bg-background", className)}>
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            WatchLog
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/movies" className="text-sm font-medium hover:text-primary">
              Movies
            </Link>
            <Link href="/genres" className="text-sm font-medium hover:text-primary">
              Genres
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* <form className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search movies..." className="pl-8 w-full" />
          </form> */}
          <SearchBar isMobile={false} />

          <ThemeToggle />

          {isLoggedIn ? (
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
