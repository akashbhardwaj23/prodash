"use client";

import { useRouter } from "next/navigation";

import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";

interface ProductTableProps {
  products: Product[];
}

const catelog = [
  {
    name: "Product",
  },
  {
    name: "Category",
  },
  {
    name: "Price",
  },
  {
    name: "Rating",
  },
  {
    name: "Stock",
  },
];

export default function ProductTable({
  products,
}: ProductTableProps) {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="overflow-hidden rounded-lg border-[3px_3px_2px_2px] bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead className="border-b bg-sky-50">
            <tr>
              {catelog.map((c) => (
                <th
                  key={c.name}
                  className="px-5 py-4 text-xs font-semibold uppercase text-neutral-600"
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() =>
                  handleRowClick(product.id)
                }
                className="cursor-pointer hover:bg-neutral-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        product.thumbnail ||
                        product.images?.[0] ||
                        ""
                      }
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
                  {formatPrice(product.price)}
                </td>

                <td className="px-5 py-4 text-sm">
                        <div className="flex items-center gap-2"> <Star size={16} /> {product.rating}</div>
                </td>

                <td className="px-5 py-4 text-sm">
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}