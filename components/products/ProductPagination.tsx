"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  calculateTotalPages,
} from "@/lib/utils";

interface ProductPaginationProps {
  total: number;
}

export default function ProductPagination({
  total,
}: ProductPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page =
    Number(searchParams.get("page")) || 1;

  const limit =
    Number(searchParams.get("limit")) || 10;

  const totalPages =
    calculateTotalPages(
      total,
      limit
    );

  const safePage = Math.min(
    Math.max(page, 1),
    totalPages
  );

  const start =
    total === 0
      ? 0
      : (safePage - 1) * limit + 1;

  const end = Math.min(
    safePage * limit,
    total
  );

  const goToPage = (
    nextPage: number
  ) => {
    if (
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return;
    }

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.set(
      "page",
      String(nextPage)
    );

    router.replace(
      `${pathname}?${params.toString()}`
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPages = () => {
    const pages: number[] = [];

    const startPage = Math.max(
      1,
      safePage - 2
    );

    const endPage = Math.min(
      totalPages,
      safePage + 2
    );

    for (
      let i = startPage;
      i <= endPage;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-600">
        Showing{" "}
        <span className="font-medium text-neutral-900">
          {start}
        </span>
        –
        <span className="font-medium text-neutral-900">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-neutral-900">
          {total}
        </span>
      </p>

      <div className="flex items-center gap-4">
        <button
          disabled={safePage === 1}
          onClick={() =>
            goToPage(safePage - 1)
          }
          className="rounded-lg border-[2px_2px_1px_1px] px-3 py-2 text-sm cursor-pointer not-disabled:hover:bg-sky-100 disabled:opacity-40"
        >
          Previous
        </button>

        {getPages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() =>
              goToPage(pageNumber)
            }
            className={`
              h-9 min-w-9 rounded-xs
              px-2 text-sm
              cursor-pointer
              ${pageNumber === safePage
                ? "bg-neutral-900 text-background"
                : "border hover:bg-neutral-50"
              }
            `}
          >
            {pageNumber}
          </button>
        ))}

        <button
          disabled={
            safePage === totalPages
          }
          onClick={() =>
            goToPage(safePage + 1)
          }
          className="rounded-lg cursor-pointer border-[2px_2px_1px_1px] px-4 py-2 hover:bg-sky-100 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}