"use client";
import { deleteReview, getReview } from "@/lib/api/review.api";
import { analyzeMovie } from "@/lib/api/analysis.api";
import { useRouter, useParams } from "next/navigation";
import { getAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/types/review";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [review, setReview] = useState<ReviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReview(id);
      const data: ReviewResponse = await response.json();
      if (!response.ok) {
        console.error("리뷰 조회 실패");
        setErrorMessage("리뷰 조회 실패");
        setIsLoading(false);
        return;
      }
      setReview(data as ReviewResponse);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);
  if (isLoading) {
    return <div>리뷰를 조회중입니다...</div>;
  }
  if (errorMessage) {
    return <div className="text-red-500 mb-4">{errorMessage}</div>;
  }

  const handleAnalyze = async () => {
    const response = await analyzeMovie(review?.movieTitle ?? "");
    if (!response.ok) {
      console.error("AI 분석 실패");
      setErrorMessage("AI 분석 실패");
      setIsLoading(false);
      return;
    }
    router.push(`/analysis/${review?.movieTitle}`);
  };
  const handleDelete = async () => {
    const accessToken = getAccessToken() ?? "";
    if (!accessToken) {
      setErrorMessage("로그인이 필요합니다.");
      setIsLoading(false);
      router.push("/login");
      return;
    }
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      const response = await deleteReview(id, accessToken);

      if (!response.ok) {
        console.error("리뷰 삭제 실패");
        setErrorMessage("리뷰 삭제 실패");
        setIsLoading(false);
        return;
      }
      router.push("/reviews");
      setIsLoading(false);
    }
  };
  const handleUpdate = async () => {
    try {
      router.push(`/reviews/${id}/edit`);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "리뷰 수정 실패",
      );
      setIsLoading(false);
    }
  };
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/reviews")}
        className="mb-4 text-sm text-gray-500 hover:text-blue-500"
      >
        ← 리뷰 목록으로
      </button>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 border-b border-gray-200 pb-4">
          <p className="text-sm text-gray-500">영화</p>
          <h1 className="text-2xl font-bold text-gray-900">
            {review?.movieTitle}
          </h1>

          <h2 className="mt-2 text-lg font-semibold text-gray-700">
            {review?.reviewTitle}
          </h2>
        </div>

        <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">
            ⭐ {review?.rating}
          </span>

          {review && (
            <span>작성일 {new Date(review.createdAt).toLocaleString()}</span>
          )}
        </div>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-gray-500">리뷰 내용</p>
          <p className="whitespace-pre-wrap leading-7 text-gray-800">
            {review?.content}
          </p>
        </div>
        <div>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleAnalyze}
          >
            AI분석
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleUpdate}
          >
            수정
          </button>

          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </section>
    </main>
  );
}
