"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      logout();
      router.replace("/login");
    }
  };

  const navClass = (href: string) =>
    `transition hover:text-violet-300 ${
      pathname === href ? "font-bold text-violet-400" : "text-zinc-300"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-extrabold text-white transition hover:scale-105"
        >
          MovieMind
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link href="/reviews" className={navClass("/reviews")}>
            리뷰목록
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/reviews/new" className={navClass("/reviews/new")}>
                리뷰작성
              </Link>
              <Link href="/analysis" className={navClass("/analysis")}>
                AI분석목록
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={navClass("/login")}>
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white transition hover:bg-violet-700"
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
