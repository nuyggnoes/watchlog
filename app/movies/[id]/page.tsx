import { MovieDetails } from "@/components/movie-details";
import { ReviewSection } from "@/components/review-section";
import { SimilarMovies } from "@/components/similar-movies";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-8">
      <MovieDetails id={id} />
      <ReviewSection movieId={id} />
      <SimilarMovies movieId={id} />
    </div>
  );
}
