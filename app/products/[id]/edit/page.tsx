"use client"
import Link from "next/link";

import Header from "@/components/layout/Header";
import ProtectedRoute from "@/components/layout/ProtectedRoutes";

import ProductForm from "@/components/products/ProductForm";

import {
  getProduct,
} from "@/services/product.service";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } : {id : string} = useParams()

  const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

  const [notFound, setNotFound] = useState(false)

useEffect(() => {
  if(!id) return
    const loadProduct = async () => {
      try {
        const localProduct =
          localStorage.getItem(
            `product-${id}`
          );

        if (localProduct) {
         const parsedProduct = JSON.parse(localProduct);

          setProduct(parsedProduct);
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
  }, [id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading product...</p>
        </div>
      </ProtectedRoute>
    );
  }

  if (notFound || !product) {
    return (
      <ProtectedRoute>
       <NotFound/>
      </ProtectedRoute>
    );
  }

    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-neutral-50">
          <Header />

          <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link
                href={`/products/${id}`}
                className="text-sm text-neutral-500 hover:text-black"
              >
               <div className="flex items-center gap-2"> <ArrowLeft size={20}/> Back to products</div>
              </Link>

              <h1 className="mt-6 text-4xl font-bold">
                Edit Product
              </h1>

              <p className="mt-2 text-base text-neutral-600">
                Update product information.
              </p>
            </div>

            <ProductForm
              mode="edit"
              product={product}
            />
          </main>
        </div>
      </ProtectedRoute>
    );
  }


function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Product not found
        </h1>

        <Link
          href="/products"
          className="mt-4 inline-block underline"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}