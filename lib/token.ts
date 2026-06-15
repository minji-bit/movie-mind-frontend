export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}

export function removeAccessToken() {
  localStorage.removeItem("accessToken");
}
