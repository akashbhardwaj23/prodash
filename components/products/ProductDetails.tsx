"use client";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import Header from "@/components/layout/Header";

import ProductGallery from "./ProductGallery";
import ProductReviews from "./ProductReviews";
import DeleteProductDialog from "./DeleteProductDialog";

import Button from "@/components/ui/button";

import {
  deleteProduct,
} from "@/services/product.service";

import {
  Product,
} from "@/types/product";

import {
  formatPrice,
} from "@/lib/utils";
import { ArrowLeft, BackpackIcon, Star } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  const handleDelete = async () => {
    if (deleting) {
      return;
    }

    setDeleting(true);
    setDeleteError("");

    try {
      await deleteProduct(product.id);

      /*
       * DummyJSON doesn't persist mutations.
       * We navigate away after a successful
       * API response so the deleted product
       * disappears from this application view.
       */
      router.replace("/products");
    } catch {
      setDeleteError(
        "Unable to delete the product. Please try again."
      );
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />


      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="text-sm text-neutral-600 hover:text-black"
          >
          <div className="flex items-center gap-2"> <ArrowLeft size={20}/> Back to products</div>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery
            images={product.images ?? []}
            title={product.title}
          />

          <div className="space-y-4">
            <div>
              <p className="text-sm capitalize text-neutral-600">
                {product.category}
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">
                {formatPrice(product.price)}
              </span>

              <span className="rounded-full flex items-center gap-2 bg-yellow-50 px-3 py-1 text-sm">
                <Star size={16} /> {product.rating}
              </span>
            </div>
             <div>
              <h2 className="font-semibold">
                Description
              </h2>

              <p className="mt-1 text-sm leading-7 text-neutral-600">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background py-2">
                <p className="text-xs text-neutral-600">
                  Stock
                </p>

                <p className="mt-1 font-semibold">
                  {product.stock}
                </p>
              </div>

              <div className="rounded-lg bg-background py-2">
                <p className="text-xs text-neutral-600">
                  Brand
                </p>

                <p className="mt-1 font-semibold">
                  {product.brand ||
                    "N/A"}
                </p>
              </div>
            </div>

           

            {product.warrantyInformation && (
              <div className="text-sm text-neutral-600">
                <span className="font-medium text-neutral-900">
                  Warranty:
                </span>{" "}
                {product.warrantyInformation}
              </div>
            )}

            {product.shippingInformation && (
              <div className="text-sm text-neutral-600">
                <span className="font-medium text-neutral-900">
                  Shipping:
                </span>{" "}
                {product.shippingInformation}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/products/${product.id}/edit`}
              >
                <button
                  className="border-[2px_2px_1px_1px] px-4 py-2 text-sm rounded-lg bg-transparent hover:bg-neutral-100 cursor-pointer text-foreground"
                >
                  Edit Product
                </button>
              </Link>

              <Button
                variant="danger"
                onClick={() =>
                  setDeleteOpen(true)
                }
                className="text-sm"
              >
                Delete Product
              </Button>
            </div>

            {deleteError && (
              <p className="text-sm text-red-600">
                {deleteError}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10">
          <ProductReviews
            reviews={product.reviews || []}
          />
        </div>
      </main>

      <DeleteProductDialog
        open={deleteOpen}
        productTitle={product.title}
        loading={deleting}
        onCancel={() =>
          setDeleteOpen(false)
        }
        onConfirm={handleDelete}
      />
    </div>
  );
}