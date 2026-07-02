"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessToken,
  removeAccessToken,
  setAccessTokenLocalStorage,
} from "@/lib/token";

//Context 생성
const AuthContext = createContext<{
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}>({
  accessToken: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

//Context Provider 생성
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  //   const token = getAccessToken(); //클라이언트 컴포넌트여도 초기 렌더 안정성을 위해 useEffect에서 읽는 게 좋음
  useEffect(() => {
    setAccessToken(getAccessToken());
  }, []);

  const login = (accessToken: string) => {
    console.log("login", accessToken);
    setAccessToken(accessToken);
    setAccessTokenLocalStorage(accessToken);
  };

  const logout = () => {
    removeAccessToken();
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated: !!accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//Context 사용
export function useAuth() {
  return useContext(AuthContext);
}
