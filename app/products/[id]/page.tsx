"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProductDetails from "@/components/products/ProductDetails";
import ProtectedRoute from "@/components/layout/ProtectedRoutes";

import { getProduct } from "@/services/product.service";
import { Product } from "@/types/product";

export default function ProductPage() {
  const params = useParams();

  const id = params.id as string;
  const numericId = Number(id);

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [notFound, setNotFound] =
    useState(false);

  useEffect(() => {
    if (
      !Number.isInteger(numericId) ||
      numericId <= 0
    ) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        const localProduct =
          localStorage.getItem(
            `product-${id}`
          );

        if (localProduct) {
          setProduct(
            JSON.parse(localProduct)
          );
          setLoading(false);
          return;
        }
        const result =
          await getProduct(id);

        setProduct(result);
      } catch (error) {
        console.error(
          "Failed to load product:",
          error
        );

        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, numericId]);

  if (loading) {
    return (
      <ProtectedRoute>
        <main className="flex min-h-screen items-center justify-center">
          <p className="text-neutral-600">
            Loading product...
          </p>
        </main>
      </ProtectedRoute>
    );
  }

  if (notFound || !product) {
    return (
      <ProtectedRoute>
        <ProductNotFound />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <ProductDetails
        product={product}
      />
    </ProtectedRoute>
  );
}

function ProductNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Product not found
        </h1>

        <p className="mt-3 text-gray-500">
          The product you're looking for
          doesn't exist.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-neutral px-5 py-3 text-sm font-medium text-background"
        >
          Back to Products
        </Link>
      </div>
    </main>
  );
}