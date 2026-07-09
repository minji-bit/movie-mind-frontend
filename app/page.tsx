import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <h1 className="text-4xl font-extrabold text-white">Movie Mind</h1>
          <p className="mt-3 text-zinc-400">
            AI 기반 영화 리뷰 종합 분석 플랫폼
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/reviews"
              className="rounded-xl bg-violet-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-violet-700"
            >
              리뷰 보러가기
            </Link>

            <Link
              href="/analysis"
              className="rounded-xl border border-zinc-700 px-5 py-3 text-center font-semibold text-zinc-200 transition hover:border-violet-500 hover:text-violet-300"
            >
              AI 분석 결과 보기
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
          <h2 className="mb-5 text-xl font-bold text-white">주요 기능</h2>

          <ul className="grid gap-3 md:grid-cols-2">
            {[
              "여러 리뷰를 AI가 종합 분석",
              "장단점 자동 추출",
              "키워드 분석",
              "추천 의견 생성",
            ].map((text) => (
              <li
                key={text}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-4 text-sm text-zinc-300"
              >
                ✅ {text}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
