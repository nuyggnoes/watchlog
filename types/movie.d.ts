export type TMDBMovie = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type TMDBMovieDetail = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: { id: number; name: string }[];
};

export type TMDBCredits = {
    cast: {
        id: number;
        name: string;
        character: string;
        profile_path: string | null;
    }[];
    crew: {
        id: number;
        name: string;
        job: string;
        department: string;
        profile_path: string | null;
    }[];
};

type TMDBVideoResponse = {
    results: {
        key: string;
        type: string;
        site: string;
    }[];
};

export type Movie = {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    rating: number;
};

export type HeroMovie = {
    id: number;
    backdrop_path: string | null;
    overview: string;
    title: string;
    vote_average: number;
    trailer: string | null;
};

    
export type CastMember = {
    name: string;
    character: string;
    profile: string;
};

export type Director = {
    name: string;
    profile: string;
}

// adult boolean Defaults to true
// backdrop_path string
// genre_ids array of integers
// id integer Defaults to 0
// original_language string
// original_title string
// overview string
// popularity number Defaults to 0
// poster_path string
// release_date string
// title string
// video boolean Defaults to true
// vote_average number Defaults to 0
// vote_count integer Defaults to 0