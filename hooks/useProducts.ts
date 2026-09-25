"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getProducts,
} from "@/services/product.service";

import {
  Product,
  ProductQuery,
} from "@/types/product";

interface UseProductsResult {
  products: Product[];
  total: number;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export function useProducts(
  query: ProductQuery
): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const [retryCount, setRetryCount] =
    useState(0);

  const retry = useCallback(() => {
    setRetryCount((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    let mounted = true;

    async function loadProducts() {
      setLoading(true);
      setError(false);

      try {
        const data = await getProducts(
          {
            limit: query.limit,
            skip:
              (query.page - 1) *
              query.limit,
            search: query.search,
            category: query.category,
            sortBy: query.sortBy,
            order: query.order,
          },
          controller.signal
        );

        if (!mounted) {
          return;
        }

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          err.code === "ERR_CANCELED"
        ) {
          return;
        }

        if (mounted) {
          setProducts([]);
          setTotal(0);
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;

      /*
       * Cancel the previous request when
       * search/filter/page changes.
       */
      controller.abort();
    };
  }, [
    query.page,
    query.limit,
    query.search,
    query.category,
    query.sortBy,
    query.order,
    retryCount,
  ]);

  return {
    products,
    total,
    loading,
    error,
    retry,
  };
}