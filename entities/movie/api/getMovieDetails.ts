import { getMovieCredits } from "./getMovieCredits";
import { getMovieTrailer } from "./getMovieTrailer";
import { getMovie } from "./getMovie";
import { MovieCredits, MovieDetail } from "../model/types";

export interface MovieDetailWithCredits {
  movie: MovieDetail;
  trailerUrl: string | null;
  credits: MovieCredits;
}

export async function getMovieDetails(id: string): Promise<MovieDetailWithCredits> {
  const [movie, credits, trailerKey] = await Promise.all([getMovie(id), getMovieCredits(id), getMovieTrailer(id)]);

  return {
    movie,
    trailerUrl: trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null,
    credits,
  };
}
