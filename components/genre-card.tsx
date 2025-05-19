import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface GenreCardProps {
  id: string
  name: string
  description: string
  count: number
  image: string
}

export function GenreCard({ id, name, description, count, image }: GenreCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-40 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-sm text-white/80">{count} movies</p>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/genres/${id}`} className="w-full">
          <Button className="w-full gap-2">
            Browse {name} Movies
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
