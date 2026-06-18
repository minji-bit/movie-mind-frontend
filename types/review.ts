export interface Review {
  id: string;
  movieTitle: string;
  reviewTitle: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface CreateReviewRequest {
  movieTitle: string;
  reviewTitle: string;
  content: string;
  rating: number;
}

export interface ReviewResponse {
  id: string;
  movieTitle: string;
  reviewTitle: string;
  content: string;
  rating: number;
  createdAt: string;
  message?: string;
}
