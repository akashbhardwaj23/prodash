import {
  ProductReview,
} from "@/types/product";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export default function ProductReviews({
  reviews,
}: ProductReviewsProps) {
  if (!reviews?.length) {
    return (
      <div className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Reviews
        </h2>

        <p className="mt-3 text-sm text-neutral-600">
          No reviews available.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-background py-6">
      <h2 className="text-2xl font-semibold">
        Reviews
      </h2>

      <div className="mt-4 divide-y">
        {reviews.map(
          (review, index) => (
            <article
              key={`${review.reviewerEmail}-${index}`}
              className="py-5 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium">
                    {review.reviewerName}
                  </h3>

                  <p className="text-xs text-neutral-400">
                    {review.reviewerEmail}
                  </p>
                </div>

                <div className="text-sm flex">
                  {
                    Array(review.rating).fill(1).map((v) => (
                      <Star size={20} color="grey" fill="yellow" />
                    ))
                  }
                </div>
              </div>

              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {review.comment}
              </p>

              <p className="mt-1 text-xs text-neutral-400">
                {new Date(
                  review.date
                ).toLocaleDateString()}
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );
}