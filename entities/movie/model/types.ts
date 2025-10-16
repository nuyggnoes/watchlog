export type Movie = {
  id: string;
  title: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
};

export type HeroMovie = {
  id: string;
  title: string;
  overview: string;
  backdropPath: string;
  rating: number;
  trailerUrl: string | null;
};

export type MovieDetail = {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  runtime: number;
  rating: number;
  genres: string[];
};

export type CastMember = {
  name: string;
  character: string;
  profile: string;
};

export type Director = {
  name: string;
  profile: string;
};

export type MovieCredits = {
  director: Director;
  cast: CastMember[];
};
