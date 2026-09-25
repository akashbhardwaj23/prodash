import Link from "next/link";

import ProductDetails from "@/components/products/ProductDetails";
import ProtectedRoute from "@/components/layout/ProtectedRoutes";

import {
  getProduct,
} from "@/services/product.service";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const numericId = Number(id);

  if (
    !Number.isInteger(numericId) ||
    numericId <= 0
  ) {
    return <ProductNotFound />;
  }

  try {
    const product =
      await getProduct(id);

    return (
      <ProtectedRoute>
        <ProductDetails
          product={product}
        />
      </ProtectedRoute>
    );
  } catch {
    return <ProductNotFound />;
  }
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
          className="mt-6 inline-block rounded-lg bg-neutral px-5 py-3 text-sm font-medium text-white"
        >
          Back to Products
        </Link>
      </div>
    </main>
  );
}