import type { HeroMovie, Movie, TMDBMovie } from "@/types/movie";

export async function fetchPopularMovies(page: number = 1): Promise<Movie[]> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`, {
        headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        accept: "application/json",
        },
    });

    if (!res.ok) throw new Error("Failed to fetch TMDB movies");

    const data = await res.json();
    return (data.results as TMDBMovie[]).map((movie) => ({
        id: movie.id.toString(),
        title: movie.title,
        posterPath: movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "/placeholder.svg?height=450&width=300",
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        isLiked: false,
        isBookmarked: false,
    }));
}

export async function fetchHeroMovie():Promise<HeroMovie> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`, {
        headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        accept: 'application/json',
        },
    });

    const data = await res.json();
    const top = data.results[0];

    return {
        id: top.id,
        title: top.title,
        backdrop_path: `https://image.tmdb.org/t/p/original${top.backdrop_path}`,
        vote_average: top.vote_average,
        overview: top.overview,
    }
}

