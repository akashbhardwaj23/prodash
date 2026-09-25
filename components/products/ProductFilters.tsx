"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import Select from "@/components/ui/select";

import {
  PAGE_SIZES,
  SORT_OPTIONS,
} from "@/lib/constant";

import { Category } from "@/types/product";

interface ProductFiltersProps {
  categories: Category[];
  props: {
    search: string
    category: string
    sortBy: string
    order: "asc" | "desc"
    limit: number | 10
  }
}

export default function ProductFilters({
  categories,
  props
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const updateParams = (
    key: string,
    value: string
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.replace(
      `${pathname}?${params.toString()}`
    );
  };


  const handleCategoryChange = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set("category", value);
      params.delete("search");
    } else {
      params.delete("category");
    }

    params.set("page", "1");

    router.replace(
      `${pathname}?${params.toString()}`
    );
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Select
        label="Category"
        value={props.category}
        onChange={(event: any) =>
          handleCategoryChange(
            event.target.value
          )
        }
        options={[
          {
            label: "All Categories",
            value: "",
          },
          ...categories.map(
            (item) => ({
              label: item.name,
              value: item.slug,
            })
          ),
        ]}
      />

      <Select
        label="Sort by"
        value={props.sortBy}
        onChange={(event: any) =>
          updateParams(
            "sortBy",
            event.target.value
          )
        }
        options={SORT_OPTIONS}
      />

      <Select
        label="Order"
        value={props.order}
        onChange={(event: any) =>
          updateParams(
            "order",
            event.target.value
          )
        }
        options={[
          {
            label: "Ascending",
            value: "asc",
          },
          {
            label: "Descending",
            value: "desc",
          },
        ]}
        disabled={!props.sortBy}
      />

      <Select
        label="Page size"
        value={props.limit}
        onChange={(event: any) =>
          updateParams(
            "limit",
            event.target.value
          )
        }
        options={PAGE_SIZES.map(
          (size) => ({
            label: `${size} per page`,
            value: String(size),
          })
        )}
      />

      {props.search && (
        <p className="text-xs text-gray-500 sm:col-span-2 lg:col-span-4">
          Category filtering is disabled while
          search is active.
        </p>
      )}
    </div>
  );
}