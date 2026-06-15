import { apiFetch } from "./client";

export async function getReviews() {
  const response = await apiFetch("/reviews", {
    method: "GET",
  });
  return response;
}
