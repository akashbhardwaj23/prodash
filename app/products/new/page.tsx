import Link from "next/link";

import Header from "@/components/layout/Header";
import ProtectedRoute from "@/components/layout/ProtectedRoutes";
import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-black"
            >
              ← Back to products
            </Link>

            <h1 className="mt-4 text-2xl font-bold">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new product.
            </p>
          </div>

          <ProductForm mode="create" />
        </main>
      </div>
    </ProtectedRoute>
  );
}