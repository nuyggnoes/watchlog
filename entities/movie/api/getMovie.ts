import { mapTMDBMovieDetail } from "../lib/mapper";
import { tmdbFetch } from "../lib/tmdbClient";
import { TMDBMovieDetail } from "../lib/tmdbTypes";

export async function getMovie(id: string) {
  const data = await tmdbFetch<TMDBMovieDetail>(`/movie/${id}`, {
    language: "ko-KR",
  });
  return mapTMDBMovieDetail(data);
}
