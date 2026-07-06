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
  isInitializing: boolean;
}>({
  accessToken: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isInitializing: true,
});

//Context Provider 생성
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  //   const token = getAccessToken(); //클라이언트 컴포넌트여도 초기 렌더 안정성을 위해 useEffect에서 읽는 게 좋음
  const [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    setAccessToken(getAccessToken());
    setIsInitializing(false);
  }, []);

  const login = (accessToken: string) => {
    setAccessToken(accessToken);
    setAccessTokenLocalStorage(accessToken);
  };

  const logout = () => {
    removeAccessToken();
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//Context 사용
export function useAuth() {
  return useContext(AuthContext);
}
