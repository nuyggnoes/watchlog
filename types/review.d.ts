export interface Review {
  id: string;
  user_id: string;
  movie_id: string;
  rating: number;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewRequest {
  movie_id: string;
  rating: number;
  body: string;
}

export interface ReviewWithUser extends Review {
  user: {
    id: string;
    email: string;
  };
}