import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query");
    const page = req.nextUrl.searchParams.get('page');

    if (!query) {
        return NextResponse.json([], { status: 200 });
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
    )}&page=${page}&language=ko-KR&include_adult=false`;

    const res = await fetch(url, {
        headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
    });

    const data = await res.json();

    const results = data.results.map((movie: any) => ({
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

    return NextResponse.json({results, totalPages:data.total_pages, totalResults: data.total_results});
}
