import { getReview } from "@/lib/api/review.api";
import { ReviewResponse } from "@/types/review";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getReview(id);
  const data: ReviewResponse = await response.json();
  if (!response.ok) {
    return <div>Error: {data.message ?? "리뷰 조회 실패"}</div>;
  }

  return (
    <div>
      <p className="text-lg mb-2">영화제목 : {data.movieTitle}</p>
      <p className="text-lg mb-2">리뷰제목 : {data.reviewTitle}</p>
      <p className="text-lg mb-2">리뷰내용 : {data.content}</p>
      <p className="text-lg mb-2">평점 : {data.rating}</p>
      <p className="text-lg mb-2">
        작성일 : {new Date(data.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
