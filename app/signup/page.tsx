"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api/auth.api";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await signUp({ email, password, nickname });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message); //이메일이 이미 존재합니다.
      }
      router.push("/login"); //회원가입 성공시 로그인 페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); //이메일이 이미 존재합니다.
      } else {
        console.error("회원가입 실패");
      }
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="text"
          placeholder="닉네임"
          onChange={handleNicknameChange}
          value={nickname}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          value={password}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          onChange={handlePasswordConfirmChange}
          value={passwordConfirm}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
