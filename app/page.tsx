import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-4xl font-extrabold text-slate-900">Movie Mind</h1>
          <p className="mt-3 text-gray-500">
            AI 기반 영화 리뷰 종합 분석 플랫폼
          </p>
          <div className="flex justify-center">
            <Link
              href="/reviews"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 mr-4"
            >
              [리뷰 보러가기]
            </Link>
            <Link
              href="/analysis"
              className="rounded-md border border-blue-500 px-5 py-2 text-blue-600 hover:bg-blue-50"
            >
              [AI분석 결과 보기]
            </Link>
          </div>
        </section>
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
          <h2 className="mb-5 text-xl font-bold text-slate-900">주요 기능</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            <li className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-gray-700">
              ✅여러 리뷰를 AI가 종합 분석
            </li>
            <li className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-gray-700">
              ✅장단점 자동 추출
            </li>
            <li className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-gray-700">
              ✅키워드 분석
            </li>
            <li className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-gray-700">
              ✅추천 의견 생성
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
