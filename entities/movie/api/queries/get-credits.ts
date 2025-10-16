import { tmdbFetch } from "../tmdb-client";
import { buildImageUrl } from "../../lib/image-url";
import type { TMDBCredits } from "../tmdb-types";
import type { MovieCredits } from "../../model/types";

export async function getMovieCredits(movieId: string): Promise<MovieCredits> {
  const data = await tmdbFetch<TMDBCredits>(`/movie/${movieId}/credits`, {
    language: "ko-KR",
  });

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
