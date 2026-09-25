"use client";

import Link from "next/link";

import {
  Product,
} from "@/types/product";

import {
  formatPrice,
} from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
}

const catelog = [{
  name : "Product"
}, {
  name : "Category"
}, {
  name : "Price"
},
  {
    name : "Rating"
  },
{
  name : "Stock"
}, {
  name : "Action"
}]

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-[8px] border-[2px_2px_1px_1px] bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead className="border-b bg-sky-50">
            <tr>
              {catelog.map((c) => (
                <th key={c.name} className="px-5 py-4 text-xs font-semibold uppercase text-neutral-600">
                {c.name}
              </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-neutral-50 cursor-pointer"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <div className="max-w-62.5">
                      <p className="truncate font-medium">
                        {product.title}
                      </p>

                      <p className="truncate text-xs text-neutral-600">
                        {product.brand ||
                          "No brand"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm capitalize">
                  {product.category}
                </td>

                <td className="px-5 py-4 text-sm font-medium">
                  {formatPrice(
                    product.price
                  )}
                </td>

                <td className="px-5 py-4 text-sm">
                  <span>
                    ⭐ {product.rating}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm">
                  {product.stock}
                </td>

                <td className="px-5 py-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}