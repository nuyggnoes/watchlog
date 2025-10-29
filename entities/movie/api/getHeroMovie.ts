import { getPopularMovies } from "./getPopularMovies";
import { getMovie } from "./getMovie";
import { getMovieTrailer } from "./getMovieTrailer";
import { mapMovieDetailToHero } from "../lib/mapper";
import { HeroMovie } from "../model/types";

export async function getHeroMovie(): Promise<HeroMovie> {
  const popularMovies = await getPopularMovies(1);

  if (!popularMovies.length) {
    throw new Error("No popular movies found");
  }

  const topMovieId = popularMovies[0].id;

  const [movieDetail, trailerKey] = await Promise.all([getMovie(topMovieId), getMovieTrailer(topMovieId)]);

  return mapMovieDetailToHero(movieDetail, trailerKey);
}
