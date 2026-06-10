import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href="/">Movie Mind</Link>
      <div>리뷰목록</div>
      <div>로그인</div>
      <div>회원가입</div>
    </div>
  );
}
