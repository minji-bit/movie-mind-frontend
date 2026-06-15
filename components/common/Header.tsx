import Link from "next/link";

export default function Header() {
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
    </header>
  );
}
