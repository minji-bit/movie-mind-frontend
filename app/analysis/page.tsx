"use client";
import { getAnalysisList } from "@/lib/api/analysis.api";
import { Analysis } from "@/types/analysis";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const [analysisList, setAnalysisList] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sentimentStyle = {
    POSITIVE: "bg-green-100 text-green-800",
    NEGATIVE: "bg-red-100 text-red-800",
    MIXED: "bg-gray-100 text-gray-800",
  };
  useEffect(() => {
    const fetchAnalysisList = async () => {
      try {
        const response = await getAnalysisList();
        if (!response.ok) {
          throw new Error("Failed to fetch analysis list");
        }
        const data = await response.json();
        setAnalysisList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analysis list:", error);
        setErrorMessage("분석 결과를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };
    fetchAnalysisList();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
        <h1>분석 결과 목록</h1>
        {analysisList.length === 0 ? (
          <p className="text-center text-gray-500">분석 결과가 없습니다.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {analysisList.map((analysis) => (
              <li
                key={`${analysis.movieTitle}-${analysis.createdAt.toString()}`}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {analysis.movieTitle}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-4 py-1 ${sentimentStyle[analysis.sentiment as keyof typeof sentimentStyle]}`}
                    >
                      {analysis.sentiment}
                    </span>
                    <Link
                      href={`/analysis/${encodeURIComponent(analysis.movieTitle)}`} //한글/공백 영화 제목이면 깨질수 있으므로 인코딩
                    >
                      [결과보기]
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
