"use client"; //localstorage 에서 accessToken 을 가져오기 위해서
import { updateReview, getReview } from "@/lib/api/review.api";
import { UpdateReviewRequest } from "@/types/review";
import { getAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReviewForm from "@/components/review/ReviewForm";
import Loading from "@/components/common/Loading";
import EmptyState from "@/components/common/EmptyState";

export default function EditReviewPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [review, setReview] = useState<UpdateReviewRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await getReview(id);
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message ?? "리뷰 조회 실패");
        }
        const review = await response.json();
        setReview({
          movieTitle: review.movieTitle,
          reviewTitle: review.reviewTitle,
          content: review.content,
          rating: review.rating,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          error instanceof Error ? error.message : "리뷰 조회 실패",
        );
        setIsLoading(false);
      }
    };
    fetchReview();
  }, [id]);
  if (isLoading) {
    return <Loading />;
  }
  if (errorMessage) {
    return <div className="text-red-500 mb-4">{errorMessage}</div>;
  }
  if (!review) {
    return <EmptyState />;
  }
  const handleSubmit = async (values: UpdateReviewRequest) => {
    try {
      const accessToken = getAccessToken() ?? "";
      if (!accessToken) {
        router.push("/login");
        return;
      }

      const response = await updateReview(id, accessToken, values);
      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message ?? "리뷰 수정 실패");
        return;
      }
      router.push(`/reviews/${id}`);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "리뷰 수정 실패",
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">리뷰 수정</h1>
      <ReviewForm
        initialValues={{
          movieTitle: review.movieTitle ?? "",
          reviewTitle: review.reviewTitle ?? "",
          content: review.content ?? "",
          rating: review.rating ?? 0,
        }}
        onSubmit={handleSubmit}
        submitText="리뷰 수정"
      />
    </div>
  );
}
