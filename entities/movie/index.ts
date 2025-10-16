export type { Movie, MovieDetail, HeroMovie, CastMember, Director, MovieCredits } from "./model/types";

export { getPopularMovies } from "./api/queries/get-popular";
export { getMovieDetails } from "./api/queries/get-movie";
export { getMovieTrailer } from "./api/queries/get-movie-trailer";
export { getMovieCredits } from "./api/queries/get-credits";
export { getSimilarMovies } from "./api/queries/get-similar-movie";

export { buildImageUrl } from "./lib/image-url";
