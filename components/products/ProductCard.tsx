import Link from "next/link";

import {
  Product,
} from "@/types/product";

import {
  formatPrice,
} from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-4">
        <div>
          <p className="text-xs uppercase text-neutral-600">
            {product.category}
          </p>

          <h2 className="mt-1 font-semibold">
            {product.title}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {formatPrice(product.price)}
          </span>

          <span className="text-sm">
            ⭐ {product.rating}
          </span>
        </div>

        <div className="text-sm text-neutral-600">
          Stock: {product.stock}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="block rounded-lg bg-foreground px-4 py-2 text-center text-sm font-medium text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}