"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import {
  createProduct,
  getCategories,
  updateProduct,
} from "@/services/product.service";

import {
  Category,
  Product,
  ProductFormData,
} from "@/types/product";

interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  stock?: string;
}

const EMPTY_FORM: ProductFormData = {
  title: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  brand: "",
};

export default function ProductForm({
  mode,
  product,
}: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<ProductFormData>(
      EMPTY_FORM
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [loading, setLoading] =
    useState(false);

  const [serverError, setServerError] =
    useState("");
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (
      mode === "edit" &&
      product
    ) {
      setForm({
        title: product.title || "",
        description:
          product.description || "",
        category:
          product.category || "",
        price:
          product.price?.toString() || "",
        stock:
          product.stock?.toString() || "",
        brand: product.brand || "",
      });
    }
  }, [mode, product]);

  const updateField = (
    field: keyof ProductFormData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.title.trim()) {
      nextErrors.title =
        "Title is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description =
        "Description is required.";
    }

    if (!form.category.trim()) {
      nextErrors.category =
        "Category is required.";
    }

    const price = Number(form.price);

    if (
      form.price === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      nextErrors.price =
        "Enter a valid non-negative price.";
    }

    const stock = Number(form.stock);

    if (
      form.stock === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      nextErrors.stock =
        "Stock must be a non-negative integer.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length ===
      0
    );
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setServerError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    const payload: Partial<Product> = {
      title: form.title.trim(),
      description:
        form.description.trim(),
      category:
        form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      brand:
        form.brand.trim() || undefined,
    };

    try {
      if (
        mode === "create"
      ) {
        const created =
          await createProduct(
            payload
          );

        localStorage.setItem(
          `product-${created.id}`,
          JSON.stringify(created)
        );

        router.replace(
          `/products/${created.id}`
        );
      } else if (
        mode === "edit" &&
        product
      ) {

        const storageKey =
          `product-${product.id}`;

        const existingLocalProduct =
          localStorage.getItem(storageKey);

        let updated: Partial<Product> = {};

        if (!existingLocalProduct) {
          updated = await updateProduct(
            product.id,
            payload
          );
        }

        const localProduct: Product = {
          ...product,
          ...updated,

          title: payload.title ?? product.title,
          description:
            payload.description ??
            product.description,
          category:
            payload.category ??
            product.category,
          price:
            payload.price ??
            product.price,
          stock:
            payload.stock ??
            product.stock,
          brand:
            payload.brand ??
            product.brand,

          images:
            updated.images ??
            product.images ??
            [],

          thumbnail:
            updated.thumbnail ??
            product.thumbnail ??
            "",

          tags:
            updated.tags ??
            product.tags ??
            [],

          reviews:
            updated.reviews ??
            product.reviews ??
            [],
        };

        localStorage.setItem(
          `product-${product.id}`,
          JSON.stringify(localProduct)
        );


        router.replace(
          `/products/${product.id}`
        );
      }
    } catch {
      setServerError(
        mode === "create"
          ? "Unable to create product."
          : "Unable to update product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border-[2px_2px_1px_1px] bg-background py-8 px-6"
    >
      {serverError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input
            value={form.title}
            onChange={(event) =>
              updateField(
                "title",
                event.target.value
              )
            }

            //@ts-ignore
            error={errors.title}
            placeholder="Product title"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-neutral-600">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(event) =>
              updateField(
                "description",
                event.target.value
              )
            }
            placeholder="Product description"
            rows={5}
            className={`
              w-full rounded-lg border-[1px_1px_2px_2px]
              px-3 py-2.5 text-sm
              outline-none focus:border-sky-200
              ${errors.description
                ? "border-red-500"
                : "border-gray-300"
              }
            `}
          />

          {errors.description && (
            <p className="mt-1 text-xs text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-600">
            Category
          </label>

          <select
            value={form.category}
            onChange={(event) =>
              updateField(
                "category",
                event.target.value
              )
            }
            disabled={categoriesLoading}
            className={`
          w-full rounded-lg border-[1px_1px_2px_2px]
          px-4 py-2.5 text-sm
          outline-none
                  border-neutral-300
          focus:border-sky-200
          ${errors.category
                    ? "border-red-500"
                    : "border-neutral-100"
                  }
          ${categoriesLoading
                    ? "cursor-not-allowed bg-neutral-100"
                    : "bg-white"
                  }
    `}
          >
            <option value="">
              {categoriesLoading
                ? "Loading categories..."
                : "Select category"}
            </option>

            {categories.map((category) => (
              <option
                key={category.slug}
                value={category.slug}
              >
                {category.name}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="mt-1 text-xs text-red-600">
              {errors.category}
            </p>
          )}
        </div>

        <div className="mt-6">
          <Input
          value={form.brand}
          onChange={(event) =>
            updateField(
              "brand",
              event.target.value
            )
          }
          placeholder="Brand"
        />
        </div>

        <Input
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(event) =>
            updateField(
              "price",
              event.target.value
            )
          }
          //@ts-ignore
          error={errors.price}
          placeholder="Price"
        />

        <Input
          type="number"
          min="0"
          step="1"
          value={form.stock}
          onChange={(event) =>
            updateField(
              "stock",
              event.target.value
            )
          }
          error={errors.stock}
          placeholder="Stock"
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button
          type="button"
          variant="custom"
          onClick={() =>
            router.back()
          }
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-sky-400 hover:cursor-pointer hover:bg-neutral-100 rounded-lg"
          loading={loading}
        >
          {mode === "create"
            ? "Create Product"
            : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}