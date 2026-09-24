import api from "@/lib/axios";
import { Category, Product, ProductDetails, ProductResponse } from "@/types/product";


interface GetProductsParams {
     limit: number;
  skip: number;
  search?: string;
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export async function getProducts(
  params: GetProductsParams,
  signal?: AbortSignal
): Promise<ProductResponse> {
  const {
    limit,
    skip,
    search,
    category,
    sortBy,
    order = "asc",
  } = params;

  let url = "/products";

  if (search) {
    url = "/products/search";
  } else if (category) {
    url = `/products/category/${category}`;
  }

  const response = await api.get<ProductResponse>(url, {
    params: {
      limit,
      skip,
      q: search || undefined,
      sortBy: sortBy || undefined,
      order: sortBy ? order : undefined,
    },
    signal,
  });

  return response.data;
}


export async function getProduct(
  id: string,
  signal?: AbortSignal
): Promise<ProductDetails> {
  const response = await api.get<ProductDetails>(
    `/products/${id}`,
    { signal }
  );

  return response.data;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/products/categories");

  return response.data;
}

export async function createProduct(
  product: Partial<Product>
): Promise<Product> {
  const response = await api.post<Product>("/products/add", product);

  return response.data;
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
): Promise<Product> {
  const response = await api.put<Product>(
    `/products/${id}`,
    product
  );

  return response.data;
}

export async function deleteProduct(id: number) {
  const response = await api.delete(`/products/${id}`);

  return response.data;
}