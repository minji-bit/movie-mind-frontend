"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@/lib/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/common/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginApi({ email, password });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message); //이메일 또는 비밀번호가 일치하지 않습니다.
      }
      //로그인 성공
      login(data.accessToken); // Context에서 로그인 함수 호출
      // window.location.href = "/reviews"; //로그인 성공시 리뷰 페이지로 이동 MVP 단계에서는 window.location.href으로 새로고침(AuthContext 생성전까지 유지)
      router.push("/reviews"); //AuthContext 생성하여 새로고침 없이 리뷰 페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); //이메일 또는 비밀번호가 일치하지 않습니다.
      } else {
        console.error("로그인 실패");
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          value={password}
        />

        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
}
