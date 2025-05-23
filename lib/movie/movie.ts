import type { HeroMovie, Movie, TMDBMovie } from "@/types/movie";

export async function fetchPopularMovies(): Promise<Movie[]> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`, {
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

interface FilterParams {
    sort: string;
    page: string;
    ratingMin: string;
    ratingMax: string;
    yearMin: string;
    yearMax: string;
    language: string;
}

export async function fetchFilteredMovies({
    sort,
    page,
    ratingMin,
    ratingMax,
    yearMin,
    yearMax,
    language,
}: FilterParams): Promise<Movie[]> {
    const query = new URLSearchParams({
        sort_by: sort,
        include_adult: "false",
        include_video: "false",
        language: "ko-KR",
        page,
        "vote_average.gte": ratingMin,
        "vote_average.lte": ratingMax,
        "primary_release_date.gte": `${yearMin}-01-01`,
        "primary_release_date.lte": `${yearMax}-12-31`,
        with_original_language: language,
    });

    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?${query.toString()}`, {
        headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
    });

    if (!res.ok) {
        console.error("TMDB API error:", await res.text());
        throw new Error("Failed to fetch movies from TMDB");
    }

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