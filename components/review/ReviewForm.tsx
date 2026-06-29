import { Review } from "@/types/review";
import { useState } from "react";
import Button from "../common/Button";

interface ReactFormValues {
  movieTitle: string;
  reviewTitle: string;
  content: string;
  rating: number;
}

interface ReviewFormProps {
  initialValues: ReactFormValues;
  onSubmit: (values: ReactFormValues) => void;
  submitText: string;
}

export default function ReviewForm({
  initialValues,
  onSubmit,
  submitText,
}: ReviewFormProps) {
  const [movieTitle, setMovieTitle] = useState(initialValues.movieTitle);
  const [reviewTitle, setReviewTitle] = useState(initialValues.reviewTitle);
  const [content, setContent] = useState(initialValues.content);
  const [rating, setRating] = useState(initialValues.rating);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ movieTitle, reviewTitle, content, rating });
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="movieTitle">영화 제목</label>
        <input
          type="text"
          id="movieTitle"
          name="movieTitle"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="reviewTitle">리뷰 제목</label>
        <input
          type="text"
          id="reviewTitle"
          name="reviewTitle"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="content">리뷰 내용</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="rating">평점</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          min={0}
          max={5}
          step={0.5}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <Button type="submit">{submitText}</Button>
    </form>
  );
}
