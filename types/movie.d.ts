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

export type Movie = {
    id: string;
    title: string;
    posterPath: string;
    releaseDate: string;
    rating: number;
    isLiked: boolean;
    isBookmarked: boolean;
};

export type HeroMovie = Pick<TMDBMovie, 'id' | 'title' | 'backdrop_path' | 'overview' | 'vote_average'>;


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