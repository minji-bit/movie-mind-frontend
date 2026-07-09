import { Review } from "@/types/review";
import Link from "next/link";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <li className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg transition hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-2xl">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">{review.movieTitle}</h3>
        <p className="mt-1 text-sm font-medium text-zinc-300">
          {review.reviewTitle}
        </p>
      </div>

      <p className="mb-4 line-clamp-3 text-sm leading-6 text-zinc-400">
        {review.content}
      </p>

      <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
        <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-yellow-300">
          ⭐ {review.rating}
        </span>
        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
      </div>

      <Link
        href={`/reviews/${review.id}`}
        className="inline-flex text-sm font-semibold text-violet-400 transition hover:text-violet-300"
      >
        상세보기 →
      </Link>
    </li>
  );
}
