import { MovieDetails } from "@/components/movie-details";
import { ReviewSection } from "@/components/review-section";
import { SimilarMovies } from "@/components/similar-movies";
import { fetchMovieReviews } from "@/lib/review/review";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const reviews = await fetchMovieReviews(id);

  return (
    <div className="space-y-8">
      <MovieDetails id={id} />
      <ReviewSection movieId={id} initialReviews={reviews} />
      <SimilarMovies movieId={id} />
    </div>
  );
}
