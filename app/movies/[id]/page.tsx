import { MovieDetails } from "@/components/movie-details"
import { ReviewSection } from "@/components/review-section"
import { SimilarMovies } from "@/components/similar-movies"

export default function MoviePage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <MovieDetails id={params.id} />
      <ReviewSection movieId={params.id} />
      <SimilarMovies movieId={params.id} />
    </div>
  )
}
