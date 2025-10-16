import { buildImageUrl } from "../lib/image-url";
import { HeroMovie, Movie } from "../model/types";
import { TMDBMovie, TMDBMovieDetail } from "./tmdb-types";

export function mapTMDBMovie(tmdb: TMDBMovie): Movie {
  return {
    id: tmdb.id.toString(),
    title: tmdb.title,
    posterPath: buildImageUrl(tmdb.poster_path, "w300"),
    releaseDate: tmdb.release_date,
    rating: tmdb.vote_average,
  };
}

export function mapTMDBMovieDetail(tmdb: TMDBMovieDetail) {
  return {
    id: tmdb.id.toString(),
    title: tmdb.title,
    overview: tmdb.overview,
    posterPath: buildImageUrl(tmdb.poster_path, "original"),
    backdropPath: buildImageUrl(tmdb.backdrop_path, "original"),
    releaseDate: tmdb.release_date,
    runtime: tmdb.runtime,
    rating: tmdb.vote_average,
    genres: tmdb.genres.map((genre) => genre.name),
  };
}

export function mapTMDBMovieToHero(tmdb: TMDBMovie): Omit<HeroMovie, "trailerUrl"> {
  return {
    id: tmdb.id.toString(),
    title: tmdb.title,
    overview: tmdb.overview,
    backdropPath: buildImageUrl(tmdb.backdrop_path, "original"),
    rating: tmdb.vote_average,
  };
}
