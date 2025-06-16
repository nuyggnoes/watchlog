import type { HeroMovie, Movie, TMDBMovie, TMDBVideoResponse } from "@/types/movie";

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

export async function fetchHeroMovie(): Promise<HeroMovie> {
    const headers = {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        accept: "application/json",
    };

    const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

    const popularRes = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        { headers }
    );
    const popularData = await popularRes.json();
    const topMovie = popularData.results[0];

    if (!topMovie) {
        throw new Error("No popular movie found");
    }

    const videosRes = await fetch(
        `https://api.themoviedb.org/3/movie/${topMovie.id}/videos?language=ko-KR`,
        { headers }
    );
    const videosData:TMDBVideoResponse = await videosRes.json();

    const trailer = videosData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return {
        id: topMovie.id,
        title: topMovie.title,
        overview: topMovie.overview,
        vote_average: topMovie.vote_average,
        backdrop_path: topMovie.backdrop_path
        ? `${BASE_IMAGE_URL}${topMovie.backdrop_path}`
        : "/placeholder.svg",
        trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
    };
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
}: FilterParams): Promise<{
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}>  {
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
    
    const movies = (data.results as TMDBMovie[]).map((movie) => ({
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

    return {movies, totalPages:data.total_pages, totalResults:data.total_results};
}