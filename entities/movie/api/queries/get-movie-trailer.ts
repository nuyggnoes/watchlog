import { tmdbFetch } from "../tmdb-client";

type TMDBVideoResponse = {
  results: {
    key: string;
    type: string;
    site: string;
  }[];
};

export async function getMovieTrailer(movieId: string): Promise<string | null> {
  const data = await tmdbFetch<TMDBVideoResponse>(`/movie/${movieId}/videos`, {
    language: "ko-KR",
  });

  const trailer = data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

  return trailer?.key || null;
}
