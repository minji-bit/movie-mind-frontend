import { apiFetch } from "./client";
import { LoginRequest, SignupRequest } from "@/types/auth";

export async function signUp(request: SignupRequest) {
  const response = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response;
}
export async function loginApi(request: LoginRequest) {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response;
}
export async function getMe() {
  const response = await apiFetch("/auth/me", {
    method: "GET",
  });
}
