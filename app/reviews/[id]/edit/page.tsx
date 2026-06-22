"use client"; //localstorage 에서 accessToken 을 가져오기 위해서
import { updateReview, getReview } from "@/lib/api/review.api";
import { UpdateReviewRequest } from "@/types/review";
import { getAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditReviewPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [movieTitle, setMovieTitle] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  useEffect(() => {
    const fetchReview = async () => {
      const data = await getReview(id);
      if (!data.ok) {
        const error = await data.json();
        throw new Error(error.message ?? "리뷰 조회 실패");
      }
      const review = await data.json();
      setMovieTitle(review.movieTitle);
      setReviewTitle(review.reviewTitle);
      setContent(review.content);
      setRating(review.rating);
    };
    fetchReview();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accessToken = getAccessToken() ?? "";
    if (!accessToken) {
      router.push("/login");
      return;
    }
    const review: UpdateReviewRequest = {
      movieTitle,
      reviewTitle,
      content,
      rating,
    };
    const response = await updateReview(id, accessToken, review);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message ?? "리뷰 수정 실패");
    }
    router.push(`/reviews/${id}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movieTitle"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          type="text"
          name="reviewTitle"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button type="submit">수정</button>
      </form>
    </div>
  );
}
