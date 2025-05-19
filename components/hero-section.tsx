import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Star } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] rounded-xl overflow-hidden">
      <Image src="/placeholder.svg?height=800&width=1600" alt="Featured movie" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-yellow-500 text-black text-xs font-medium px-2.5 py-0.5 rounded">Featured</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm text-white">8.9/10</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Dune: Part Two</h1>
        <p className="text-white/80 max-w-2xl mb-6 line-clamp-2 md:line-clamp-3">
          Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed
          his family.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="gap-2">
            <Play className="h-4 w-4" />
            Watch Trailer
          </Button>
          <Link href="/movies/1">
            <Button variant="outline" size="lg">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
