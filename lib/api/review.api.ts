import { CreateReviewRequest } from "@/types/review";
import { apiFetch } from "./client";

export async function getReviews() {
  const response = await apiFetch("/reviews", {
    method: "GET",
  });
  return response;
}

export async function createReview(
  review: CreateReviewRequest,
  accessToken: string,
) {
  const response = await apiFetch("/reviews", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`, // 토큰 인증
    },
    body: JSON.stringify(review),
  });
  return response;
}
