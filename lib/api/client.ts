const BASE_URL = "http://localhost:4000";

export async function apiFetch(url: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${response.statusText}`,
    );
  }
  return response.json();
}
