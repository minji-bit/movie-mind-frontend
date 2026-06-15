"use client";
import { getReviews } from "@/lib/api/review.api";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    //fetchiReviews 함수를 밖으로 빼면 컴포넌트 렌더링 때마다 새로 만들어져서 의존성 경고가 날 수 있으므로
    //useEffect 안에 넣어준다.
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        if (!response.ok) {
          setErrorMessage("리뷰 목록을 불러오지 못했습니다.");
          return;
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setErrorMessage("서버와 통신 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              {review.movieTitle}/{review.reviewTitle}/{review.content}/ ⭐
              {review.rating}/ {new Date(review.createdAt).toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>등록된 리뷰가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
