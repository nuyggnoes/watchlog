import { mapTMDBMovieDetail } from "../mapper";
import { tmdbFetch } from "../tmdb-client";
import { TMDBMovieDetail } from "../tmdb-types";

export async function getMovieById(id: string) {
  const data = await tmdbFetch<TMDBMovieDetail>(`/movie/${id}`, {
    language: "ko-KR",
  });
  return mapTMDBMovieDetail(data);
}
