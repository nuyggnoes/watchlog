export type Like = {
  id: string;
  user_id: string;
  movie_id: number;
  created_at: string;
};

export type CreateLikeDto = {
  user_id: string;
  movie_id: number;
};
