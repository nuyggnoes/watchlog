import { NextRequest, NextResponse } from "next/server";
import { fetchFilteredMovies } from "@/lib/movie/movie";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams;

    const sort = url.get("sort") ?? "popularity.desc";
    const page = url.get("page") ?? "1";

    const ratingMin = url.get("ratingMin") ?? "0";
    const ratingMax = url.get("ratingMax") ?? "10";
    const yearMin = url.get("yearMin") ?? "1900";
    const yearMax = url.get("yearMax") ?? "2025";
    const language = url.get("language") ?? "";
    
    const movies = await fetchFilteredMovies({
        sort,
        page,
        ratingMin,
        ratingMax,
        yearMin,
        yearMax,
        language,
    });
    return NextResponse.json(movies);
}