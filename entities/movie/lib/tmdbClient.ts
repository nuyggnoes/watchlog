const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!res.ok) throw new Error(`TMDB API request failed: ${res.status} ${res.statusText}`);

  return res.json();
}
