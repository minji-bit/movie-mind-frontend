"use client";
import { createReview } from "@/lib/api/review.api";
import { CreateReviewRequest } from "@/types/review";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/token";
import ReviewForm from "@/components/review/ReviewForm";

export default function NewReviewPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: CreateReviewRequest) => {
    if (
      !values.movieTitle.trim() ||
      !values.reviewTitle.trim() ||
      !values.content.trim() ||
      values.rating <= 0 ||
      values.rating > 5
    ) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }
    try {
      const accessToken = getAccessToken() ?? "";
      if (!accessToken) {
        console.error("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const response = await createReview(values, accessToken);
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
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <ReviewForm
        initialValues={{
          movieTitle: "",
          reviewTitle: "",
          content: "",
          rating: 0,
        }}
        onSubmit={handleSubmit}
        submitText="리뷰 작성"
      />
    </>
  );
}
