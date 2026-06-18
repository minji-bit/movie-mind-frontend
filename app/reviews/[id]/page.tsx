"use client";
import { deleteReview, getReview } from "@/lib/api/review.api";
import { useRouter, useParams } from "next/navigation";
import { getAccessToken } from "@/lib/token";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/types/review";

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<ReviewResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getReview(id);
      const data: ReviewResponse = await response.json();
      if (!response.ok) {
        console.error("리뷰 조회 실패");
        return;
      }
      setData(data as ReviewResponse);
    };
    fetchData();
  }, [id]);
  const handleDelete = async () => {
    const accessToken = getAccessToken() ?? "";
    if (!accessToken) {
      console.error("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (confirm) {
      const response = await deleteReview(id, accessToken);

      if (!response.ok) {
        console.error("리뷰 삭제 실패");
        return;
      }
      router.push("/reviews");
    }
  };
  const handleUpdate = async () => {
    router.push(`/reviews/${id}/edit`);
  };
  return (
    <div>
      <p className="text-lg mb-2">영화제목 : {data?.movieTitle}</p>
      <p className="text-lg mb-2">리뷰제목 : {data?.reviewTitle}</p>
      <p className="text-lg mb-2">리뷰내용 : {data?.content}</p>
      <p className="text-lg mb-2">평점 : {data?.rating}</p>
      {data && (
        <p className="text-lg mb-2">
          작성일 : {new Date(data?.createdAt).toLocaleString()}
        </p>
      )}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={handleDelete}
      >
        삭제
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleUpdate}
      >
        수정
      </button>
    </div>
  );
}
