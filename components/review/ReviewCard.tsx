import { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <li className="border border-gray-300 rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-bold">{review.movieTitle}</h3>
      <p className="text-sm text-gray-500">{review.reviewTitle}</p>
      <p className="text-sm text-gray-500 line-clamp-3">{review.content}</p>
      <p className="text-sm text-gray-500">⭐{review.rating}</p>
      <p className="text-sm text-gray-500">
        {new Date(review.createdAt).toLocaleString()}
      </p>
    </li>
  );
}
