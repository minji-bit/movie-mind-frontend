export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  id: string;
  email: string;
  nickname: string;
  accessToken: string;
}
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}
export interface SignupResponse {
  id: string;
  email: string;
  nickname: string;
}
export interface MeResponse {
  id: string;
  email: string;
  nickname: string;
}
