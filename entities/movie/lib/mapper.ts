import { buildImageUrl } from "./image-url";
import { Movie } from "../model/types";
import { TMDBCredits, TMDBMovie, TMDBMovieDetail } from "./tmdbTypes";

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

export function mapTMDBMovieCredits(data: TMDBCredits) {
  const directorInfo = data.crew.find((p) => p.job === "Director");

  const director = {
    name: directorInfo?.name ?? "Unknown",
    profile: buildImageUrl(directorInfo?.profile_path, "w300", "/placeholder-profile.png"),
  };

  const cast = data.cast.map((p) => ({
    name: p.name,
    character: p.character,
    profile: buildImageUrl(p.profile_path, "w300", "/placeholder-profile.png"),
  }));

  return { director, cast };
}
