"use client";
import { deleteReview, getReview } from "@/lib/api/review.api";
import { analyzeMovie } from "@/lib/api/analysis.api";
import { useRouter, useParams } from "next/navigation";
import { getAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/types/review";
import Loading from "@/components/common/Loading";
import Button from "@/components/common/Button";

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
    return <Loading />;
  }
  if (errorMessage) {
    return <div className="text-red-500 mb-4">{errorMessage}</div>;
  }

  const handleAnalyze = async () => {
    if (!review?.movieTitle) {
      // 리뷰가 없으면 분석 불가
      setErrorMessage("영화제목이 없습니다.");
      setIsLoading(false);
      return;
    }
    const response = await analyzeMovie(review.movieTitle); // AI 분석 요청
    if (!response.ok) {
      // AI 분석 실패
      console.error("AI 분석 실패");
      setErrorMessage("AI 분석 실패");
      setIsLoading(false);
      return;
    }
    router.push(`/analysis/${encodeURIComponent(review.movieTitle)}`); // 영화제목을 URL 인코딩하여 페이지로 이동
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
    <main className="mx-auto max-w-3xl px-4 py-10">
      <button
        onClick={() => router.push("/reviews")}
        className="mb-5 text-sm text-zinc-400 transition hover:text-violet-300"
      >
        ← 리뷰 목록으로
      </button>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-5 border-b border-zinc-800 pb-5">
          <p className="text-sm text-zinc-500">영화</p>
          <h1 className="mt-1 text-3xl font-bold text-white">
            {review?.movieTitle}
          </h1>

          <h2 className="mt-3 text-lg font-semibold text-zinc-300">
            {review?.reviewTitle}
          </h2>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-yellow-300">
            ⭐ {review?.rating}
          </span>

          {review && (
            <span>작성일 {new Date(review.createdAt).toLocaleString()}</span>
          )}
        </div>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold text-zinc-500">리뷰 내용</p>
          <p className="whitespace-pre-wrap leading-7 text-zinc-200">
            {review?.content}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button type="button" onClick={handleAnalyze}>
            AI 분석
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={handleUpdate}
              type="button"
              className="bg-zinc-800 hover:bg-zinc-700"
            >
              수정
            </Button>

            <Button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              삭제
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
