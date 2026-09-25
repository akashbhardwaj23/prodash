"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import Header from "@/components/layout/Header";
import ProtectedRoute from "@/components/layout/ProtectedRoutes";

import ProductSearch from "./ProductSearch";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";
import ProductCard from "./ProductCard";
import ProductPagination from "./ProductPagination";
import ProductSkeleton from "./ProductSkeleton";

import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";

import { useProducts } from "@/hooks/useProducts";

import {
  getCategories,
} from "@/services/product.service";

import {
  Category,
} from "@/types/product";

import {
  parsePage,
  parsePageSize,
  calculateTotalPages,
} from "@/lib/utils";
import Link from "next/link";

export default function ProductList() {
  const searchParams =
    useSearchParams();

  const [categories, setCategories] =
    useState<Category[]>([]);

    console.log(categories)

  const [categoryError, setCategoryError] =
    useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const page = parsePage(
    searchParams.get("page")
  );

  const limit = parsePageSize(
    searchParams.get("limit")
  );

  const search =
    searchParams.get("search") || "";

  const category =
    searchParams.get("category") || "";

  const sortBy =
    searchParams.get("sortBy") || "";

  const rawOrder =
    searchParams.get("order");

  const order: "asc" | "desc" =
    rawOrder === "desc"
      ? "desc"
      : "asc";

  const query = useMemo(
    () => ({
      page,
      limit,
      search,
      category,
      sortBy,
      order,
    }),
    [
      page,
      limit,
      search,
      category,
      sortBy,
      order,
    ]
  );

  const {
    products,
    total,
    loading,
    error,
    retry,
  } = useProducts(query);

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        const data =
          await getCategories();

        if (mounted) {
          setCategories(data);
        }
      } catch {
        if (mounted) {
          setCategoryError(true);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const totalPages =
    calculateTotalPages(
      total,
      limit
    );

  useEffect(() => {
    if (
      loading ||
      total === 0 ||
      page <= totalPages
    ) {
      return;
    }

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      String(totalPages)
    );

    router.replace(
      `${pathname}?${params.toString()}`
    );
  }, [
    loading,
    total,
    page,
    totalPages,
    searchParams,
    pathname,
    router,
  ]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  Products
                </h1>

                <p className="mt-1 text-sm text-neutral-600">
                  Manage your product catalog.
                </p>
              </div>

              <Link
                href="/products/new"
                className="rounded-lg border-[2px_2px_1px_1px] hover:bg-sky-100 bg-background px-4 py-3 text-center text-sm font-medium text-foreground"
              >
                Add Product
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <ProductSearch />

            <ProductFilters
              categories={categories}
              props={{
                search : search,
                sortBy,
                category,
                order,
                limit,
              }}
            />

            {categoryError && (
              <p className="text-xs text-red-600">
                Categories could not be loaded.
              </p>
            )}

            {loading && (
              <ProductSkeleton />
            )}

            {!loading && error && (
              <ErrorState
                onRetry={retry}
              />
            )}

            {!loading &&
              !error &&
              products.length === 0 && (
                <EmptyState
                  title="No products found"
                  description={
                    totalPages === 1
                      ? "Try changing your search or filters."
                      : "This page does not contain any products."
                  }
                />
              )}

            {!loading &&
              !error &&
              products.length > 0 && (
                <>
                  <div className="hidden md:block">
                    <ProductTable
                      products={products}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 md:hidden">
                    {products.map(
                      (product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      )
                    )}
                  </div>

                  <ProductPagination
                    total={total}
                  />
                </>
              )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}