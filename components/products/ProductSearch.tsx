"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Input from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { SEARCH_DEBOUNCE_MS } from "@/lib/constant";

export default function ProductSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch =
    searchParams.get("search") || "";

  const [value, setValue] =
    useState(urlSearch);

  const debouncedValue =
    useDebounce(
      value,
      SEARCH_DEBOUNCE_MS
    );

  useEffect(() => {
    setValue(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (
      debouncedValue.trim() ===
      urlSearch.trim()
    ) {
      return;
    }

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (debouncedValue.trim()) {
      params.set(
        "search",
        debouncedValue.trim()
      );

      params.delete("category");
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.replace(
      `${pathname}?${params.toString()}`
    );
  }, [
    debouncedValue,
    urlSearch,
    searchParams,
    pathname,
    router,
  ]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
  };

  return (
    <div className="w-full">
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Search products..."
        aria-label="Search products"
      />
    </div>
  );
}