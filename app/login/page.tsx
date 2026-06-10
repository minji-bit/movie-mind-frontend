"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);
    //로그인 성공시 토큰 저장
    localStorage.setItem("accessToken", "1234567890");
    //로그인 성공시
    router.push("/reviews");
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
