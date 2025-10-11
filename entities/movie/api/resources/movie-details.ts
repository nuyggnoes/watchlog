import { getMovieById } from "../queries/get-movie";
import { getMovieCredits } from "../queries/get-credits";
import { getMovieTrailer } from "../queries/get-movie-trailer";
import { MovieCredits, MovieDetail } from "../../model/types";

export interface MovieDetailWithCredits {
  movie: MovieDetail;
  trailerUrl: string | null;
  credits: MovieCredits;
}

export async function getMovieDetails(id: string): Promise<MovieDetailWithCredits> {
  const [movie, credits, trailerKey] = await Promise.all([getMovieById(id), getMovieCredits(id), getMovieTrailer(id)]);

  return {
    movie,
    trailerUrl: trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null,
    credits,
  };
}
