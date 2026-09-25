import Link from "next/link";

import Header from "@/components/layout/Header";
import ProtectedRoute from "@/components/layout/ProtectedRoutes";
import ProductForm from "@/components/products/ProductForm";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50">
        <Header />

        <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/products"
              className="text-sm flex items-center gap-2 text-neutral-600 hover:text-black"
            >
             <ArrowLeft size={20} /> Back to products
            </Link>

            <h1 className="mt-6 text-3xl font-bold">
              Add Product
            </h1>

            <p className="mt-2 text-sm text-neutral-600">
              Create a new product.
            </p>
          </div>

          <ProductForm mode="create" />
        </main>
      </div>
    </ProtectedRoute>
  );
}