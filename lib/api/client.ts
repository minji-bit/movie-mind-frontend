const BASE_URL = "http://localhost:4000";

export async function apiFetch(url: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (response.status === 401) {
    throw new Error("로그인이 필요합니다.");
  }
  if (response.status >= 500) {
    throw new Error("서버 오류가 발생했습니다.");
  }
  return response;
}
