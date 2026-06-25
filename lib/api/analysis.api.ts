import { apiFetch } from "./client";

export async function analyzeMovie(movieTitle: string) {
  const response = await apiFetch(`/analysis/${movieTitle}`, {
    method: "POST",
  });
  return response;
}
export async function getAnalysis(movieTitle: string) {
  const response = await apiFetch(`/analysis/${movieTitle}`, {
    method: "GET",
  });
  return response;
}
export async function getAnalysisList() {
  const response = await apiFetch(`/analysis`, {
    method: "GET",
  });
  return response;
}
