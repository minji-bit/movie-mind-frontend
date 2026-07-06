"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); //활성 메뉴 판별
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      logout(); // Context에서 로그아웃 함수 호출
      router.replace("/login");
    }
  };
  return (
    <header className="flex items-center justify-between px-8 h-16 bg-gray-200">
      <Link
        href="/"
        className="text-2xl font-bold hover:scale-105 transition-all duration-200"
      >
        Movie Mind
      </Link>
      <nav className="flex gap-4">
        <Link
          href="/reviews"
          className={`hover:text-blue-500 ${pathname === "/reviews" ? "text-blue-500 font-bold" : "text-gray-700"}`}
        >
          리뷰목록
        </Link>
        {isAuthenticated ? (
          <>
            <Link
              href="/reviews/new"
              className={`hover:text-blue-500 ${pathname === "/reviews/new" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            >
              리뷰작성
            </Link>
            <Link
              href="/analysis"
              className={`hover:text-blue-500 ${pathname === "/analysis" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            >
              AI분석목록
            </Link>
            <button
              className={`bg-red-500 text-white px-4 py-2 rounded-md ${pathname === "/login" ? "text-blue-500 font-bold" : "text-gray-700"}`}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`hover:text-blue-500 ${pathname === "/login" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className={`hover:text-blue-500 ${pathname === "/signup" ? "text-blue-500 font-bold" : "text-gray-700"}`}
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
