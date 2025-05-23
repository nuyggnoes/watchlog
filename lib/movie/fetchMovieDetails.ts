import type { CastMember, Director, TMDBCredits, TMDBMovieDetail, TMDBVideoResponse } from "@/types/movie";

export async function fetchMovieDetails(id: string) {
    const headers = {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    };

    const [movie, credits, video]:[TMDBMovieDetail, TMDBCredits, TMDBVideoResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, { headers }).then((res) => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`, { headers }).then((res) => res.json()),
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`, { headers }).then((res) => res.json()),
    ]);

    const BASE_IMAGE_URL = "https://image.tmdb.org/t/p";
    const posterPath = movie.poster_path ? `${BASE_IMAGE_URL}/original${movie.poster_path}` : null;
    const backdropPath = movie.backdrop_path ? `${BASE_IMAGE_URL}/original${movie.backdrop_path}` : null;

    const directorInfo = credits.crew.find((p) => p.job === "Director");
    const director: Director = {
        name: directorInfo?.name ?? "Unknown",
        profile: directorInfo?.profile_path
        ? `${BASE_IMAGE_URL}/w185${directorInfo.profile_path}`
        : "/placeholder-profile.png",
    };

    const trailer = video.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    const topCast:CastMember[] = credits.cast.slice(0, 5).map((p) => ({
        name: p.name,
        character: p.character,
        profile: p.profile_path
        ? `${BASE_IMAGE_URL}/w185${p.profile_path}`
        : "/placeholder-profile.png",
    }));

    return { movie: { ...movie, posterPath, backdropPath, trailer: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null, }, director, topCast };
}
