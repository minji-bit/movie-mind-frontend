import { apiFetch } from "./client";
import { SignupRequest } from "@/types/auth";
import { SignupResponse } from "@/types/auth";
export async function signUp(request: SignupRequest) {
  const response = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response;
}
export async function login() {
  const response = await apiFetch("/auth/login", {
    method: "POST",
  });
}
export async function getMe() {
  const response = await apiFetch("/auth/me", {
    method: "GET",
  });
}
