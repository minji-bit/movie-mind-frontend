"use client";
import { removeAccessToken } from "@/lib/token";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleLogout = () => {
    removeAccessToken();
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
        <Link href="/reviews/new" className="hover:text-blue-500">
          리뷰작성
        </Link>
        <Link href="/login" className="hover:text-blue-500">
          로그인
        </Link>
        <Link href="/signup" className="hover:text-blue-500">
          회원가입
        </Link>
      </nav>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </header>
  );
}
