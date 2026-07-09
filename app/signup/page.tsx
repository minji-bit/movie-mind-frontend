"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api/auth.api";
import Button from "@/components/common/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

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
      router.replace("/login"); //회원가입 성공시 로그인 페이지로 이동 //push는 뒤로가기 버튼을 눌렀을 때 이전 페이지로 이동하는 것을 의미하므로 replace를 사용하여 새로고침 없이 로그인 페이지로 이동
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message); //이메일이 이미 존재합니다.
      } else {
        console.error("회원가입 실패");
      }
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">회원가입</h1>
          <p className="mt-2 text-sm text-zinc-400">
            MovieMind에 오신 것을 환영합니다
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500"
          />

          <input
            type="text"
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500"
          />

          <Button type="submit" className="mt-2 w-full">
            회원가입
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          이미 계정이 있으신가요?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-violet-400 hover:text-violet-300"
          >
            로그인
          </button>
        </p>
      </section>
    </main>
  );
}
