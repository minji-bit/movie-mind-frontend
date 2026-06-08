import { apiFetch } from "./client";
export async function signUp() {
  const response = await apiFetch("/auth/singup", {
    method: "POST",
  });
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
