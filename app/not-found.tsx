import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="text-2xl font-bold">페이지를 찾을 수 없습니다.</div>
      <Link href="/" className="text-blue-500 hover:text-blue-600">
        홈으로 이동
      </Link>
    </>
  );
}
