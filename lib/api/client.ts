const BASE_URL = "http://localhost:3000";

export async function apiFetch(url: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
