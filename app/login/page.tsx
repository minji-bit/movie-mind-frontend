"use client";

import Link from "next/link";
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await loginApi({ email, password });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      login(data.accessToken);
      router.replace("/reviews");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">로그인</h1>
          <p className="mt-2 text-sm text-zinc-400">다시 만나서 반가워요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
          />

          <input
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
          />

          <Button type="submit" className="mt-2 w-full">
            로그인
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-violet-400 hover:text-violet-300"
          >
            회원가입
          </Link>
        </p>
      </section>
    </main>
  );
}
