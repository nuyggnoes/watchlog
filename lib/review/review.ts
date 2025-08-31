import { ReviewWithUser } from "@/types/review";

const baseUrl = process.env.NODE_ENV === 'production' 
      ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000';
      
export async function fetchMovieReviews(movieId: string): Promise<ReviewWithUser[]> {
  try {

    const res = await fetch(`${baseUrl}/api/movies/${movieId}/reviews`, {
      method: "GET",
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Review fetch error:', res.status, res.statusText);
      return [];
    }

    const result = await res.json();
    
    if (result.ok && result.data) {
      return result.data;
    } else {
      console.error('Review fetch error:', result.message);
      return [];
    }
  } catch (error) {
    console.error('Review fetch error:', error);
    return [];
  }
}

export async function createReview(movieId: string, reviewData: { rating: number, body: string }) {
  const res = await fetch(`${baseUrl}/api/movies/${movieId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }

  return res.json();
}