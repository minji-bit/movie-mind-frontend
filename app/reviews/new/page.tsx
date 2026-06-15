"use client";
import { createReview } from "@/lib/api/review.api";
import { CreateReviewRequest } from "@/types/review";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewReviewPage() {
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !movieTitle.trim() ||
      !reviewTitle.trim() ||
      !content.trim() ||
      rating <= 0 ||
      rating > 5
    ) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }
    const request: CreateReviewRequest = {
      movieTitle,
      reviewTitle,
      content,
      rating,
    };
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const response = await createReview(request, accessToken);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? "리뷰 작성 실패");
      }
      router.push("/reviews");
    } catch (error) {
      console.error("리뷰 작성 실패", error);
      setErrorMessage(
        error instanceof Error ? error.message : "리뷰 작성 실패",
      );
    }
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">리뷰 작성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movieTitle">영화 제목</label>
          <input
            type="text"
            id="movieTitle"
            name="movieTitle"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="reviewTitle">리뷰 제목</label>
          <input
            type="text"
            id="reviewTitle"
            name="reviewTitle"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">리뷰 내용</label>
          <textarea
            id="content"
            name="content"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">평점</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={rating}
            min={0}
            max={5}
            step={0.5}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          작성하기
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </>
  );
}
