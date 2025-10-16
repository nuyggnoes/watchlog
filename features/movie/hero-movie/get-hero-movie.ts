import { getMovieTrailer } from "@/entities/movie/api/queries/get-movie-trailer";
import { getPopularMoviesRaw } from "@/entities/movie/api/queries/get-popular";
import { mapTMDBMovieToHero } from "@/entities/movie/api/mapper";
import { HeroMovie } from "@/entities/movie/model/types";

export async function getHeroMovie(): Promise<HeroMovie> {
  const popularMovies = await getPopularMoviesRaw();

  if (!popularMovies.length) {
    throw new Error("No popular movies found");
  }

  const topMovie = popularMovies[0];

  const heroMovieData = mapTMDBMovieToHero(topMovie);

  const trailerKey = await getMovieTrailer(heroMovieData.id);

  return {
    ...heroMovieData,
    trailerUrl: trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null,
  };
}
