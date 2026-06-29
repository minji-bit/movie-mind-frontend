"use client";
import Loading from "@/components/common/Loading";
import EmptyState from "@/components/common/EmptyState";
import ReviewCard from "@/components/review/ReviewCard";
import { getReviews } from "@/lib/api/review.api";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //fetchReviews 함수를 밖으로 빼면 컴포넌트 렌더링 때마다 새로 만들어져서 의존성 경고가 날 수 있으므로
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
      } catch {
        //catch 하위에서 error 를 안쓰니까 catch(error){} 대신 catch{} 로 사용
        setErrorMessage("서버와 통신 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">리뷰 목록</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <EmptyState />
        )}
      </ul>
    </div>
  );
}
