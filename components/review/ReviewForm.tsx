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
  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500";

  const labelClass = "text-sm font-semibold text-zinc-300";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ movieTitle, reviewTitle, content, rating });
      }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label htmlFor="movieTitle" className={labelClass}>
          영화 제목
        </label>
        <input
          type="text"
          id="movieTitle"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="reviewTitle" className={labelClass}>
          리뷰 제목
        </label>
        <input
          type="text"
          id="reviewTitle"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className={labelClass}>
          리뷰 내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="rating" className={labelClass}>
          평점
        </label>
        <input
          type="number"
          id="rating"
          value={rating}
          min={0}
          max={5}
          step={0.5}
          onChange={(e) => setRating(Number(e.target.value))}
          className={inputClass}
        />
      </div>

      <Button type="submit" className="w-full">
        {submitText}
      </Button>
    </form>
  );
}
