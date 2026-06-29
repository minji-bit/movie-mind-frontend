"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth.api";
import { setAccessToken } from "@/lib/token";
import Button from "@/components/common/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message); //이메일 또는 비밀번호가 일치하지 않습니다.
      }
      //로그인 성공
      setAccessToken(data.accessToken);
      window.location.href = "/reviews"; //로그인 성공시 리뷰 페이지로 이동 MVP 단계에서는 window.location.href으로 새로고침
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
