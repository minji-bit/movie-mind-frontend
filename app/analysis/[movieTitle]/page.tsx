"use client";
import { Analysis } from "@/types/analysis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAnalysis } from "@/lib/api/analysis.api";

export default function AnalysisPage() {
  const params = useParams();
  const encodedMovieTitle = params.movieTitle as string; // URL 인코딩된 영화제목
  const movieTitle = decodeURIComponent(encodedMovieTitle); // URL 디코딩된 영화제목
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await getAnalysis(movieTitle);
        if (!response.ok) {
          console.error("AI 분석 실패");
          setErrorMessage("AI 분석 실패");
          return;
        }
        const data = await response.json();
        setAnalysis(data as Analysis);
      } catch (error) {
        console.error("AI 분석 실패", error);
        setErrorMessage("AI 분석 실패");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalysis();
  }, [movieTitle]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!analysis) {
    // 분석 결과가 없으면 분석 실패 (여기에서 제어하니까 return문에서 analysis가 없는 경우가 없음)
    return <div>분석 결과가 없습니다.</div>;
  }

  if (errorMessage) {
    return <div className="text-red-500 mb-4">{errorMessage}</div>;
  }
  const sentimentStyle = {
    POSITIVE: "bg-green-100 text-green-700 border-green-200",
    NEGATIVE: "bg-red-100 text-red-700 border-red-200",
    MIXED: "bg-yellow-100 text-yellow-700 border-yellow-200",
  }[analysis.sentiment];
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            AI 분석 결과
          </p>

          <h1 className="mb-4 text-4xl font-extrabold text-slate-900">
            {movieTitle}
          </h1>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-700">
              {analysis.sentiment}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-1 text-sm text-slate-700">
              {analysis.genreCategory}
            </span>
            <span className="rounded-full bg-purple-100 px-4 py-1 text-sm text-purple-700">
              {analysis.moodCategory}
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700">
              신뢰도 {analysis.confidenceScore}
            </span>
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-slate-50 p-6">
          <h2 className="mb-3 text-xl font-bold text-slate-900">📝 요약</h2>
          <p className="leading-8 text-slate-700">{analysis.summary}</p>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-green-800">👍 장점</h2>
            <ul className="space-y-2">
              {analysis.prosJson.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-white px-3 py-2 text-green-900"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="mb-4 text-xl font-bold text-red-800">👎 단점</h2>
            {analysis.consJson.length > 0 ? (
              <ul className="space-y-2">
                {analysis.consJson.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg bg-white px-3 py-2 text-red-900"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-700">뚜렷한 단점이 발견되지 않았습니다.</p>
            )}
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-bold text-blue-900">🎯 추천 의견</h2>
          <p className="leading-8 text-blue-900">
            {analysis.recommendationText}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-900">🏷 키워드</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.keywordsJson.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
