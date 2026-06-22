"use client";
import { getAccessToken, removeAccessToken } from "@/lib/token";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
  }, []);
  const handleLogout = () => {
    removeAccessToken();
    setAccessToken(null);
    router.push("/login");
  };
  return (
    <header className="flex items-center justify-between px-8 h-16 bg-gray-200">
      <Link href="/" className="text-2xl font-bold">
        Movie Mind
      </Link>
      <nav className="flex gap-4">
        <Link href="/reviews" className="hover:text-blue-500">
          리뷰목록
        </Link>
        {accessToken ? (
          <>
            <Link href="/reviews/new" className="hover:text-blue-500">
              리뷰작성
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-500">
              로그인
            </Link>
            <Link href="/signup" className="hover:text-blue-500">
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
