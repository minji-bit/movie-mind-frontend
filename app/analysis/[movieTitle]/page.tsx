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
    try {
      const fetchAnalysis = async () => {
        const response = await getAnalysis(movieTitle);
        if (!response.ok) {
          console.error("AI 분석 실패");
          setErrorMessage("AI 분석 실패");
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        setAnalysis(data as Analysis);
        setIsLoading(false);
      };
      fetchAnalysis();
    } catch (error) {
      console.error("AI 분석 실패", error);
      setErrorMessage("AI 분석 실패");
      setIsLoading(false);
    }
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
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">영화제목:{movieTitle}</h1>
      <p className="text-gray-500">요약:{analysis.summary}</p>
      <p className="text-gray-500">장점:{analysis.prosJson.join(", ")}</p>
      <p className="text-gray-500">단점:{analysis.consJson.join(", ")}</p>
      <p className="text-gray-500">추천:{analysis.recommendationText}</p>
      <p className="text-gray-500">키워드:{analysis.keywordsJson.join(", ")}</p>
      <p className="text-gray-500">감정:{analysis.sentiment}</p>
      <p className="text-gray-500">장르:{analysis.genreCategory}</p>
      <p className="text-gray-500">분위기:{analysis.moodCategory}</p>
      <p className="text-gray-500">신뢰도:{analysis.confidenceScore}</p>
    </div>
  );
}
