"use client";
import Loading from "@/components/common/Loading";
import EmptyState from "@/components/common/EmptyState";
import ReviewCard from "@/components/review/ReviewCard";
import { getReviews } from "@/lib/api/review.api";
import { Review } from "@/types/review";
import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
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
  //reviews+searchKeyword 를 통해 필터링된 리뷰를 반환한다. 파생상태여서 useState 사용 안함
  const filteredReviews = reviews.filter((review) => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (keyword === "") {
      return true; //검색어가 없으면 모든 리뷰를 보여준다.
    }
    return (
      review.movieTitle.toLowerCase().includes(keyword) ||
      review.reviewTitle.toLowerCase().includes(keyword)
    );
  });
  if (isLoading) {
    return <Loading />;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">리뷰 목록</h1>
      <h2 className="text-lg font-bold mb-4">🔍 영화제목 검색</h2>
      <input
        type="text"
        placeholder="영화제목을 검색하세요."
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <EmptyState
            title="검색 결과가 없습니다."
            description="다른 영화 제목으로 검색해보세요."
          />
        )}
      </ul>
    </div>
  );
}
