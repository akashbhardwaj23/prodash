export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";

export const PAGE_SIZES = [10, 20, 50];

export const SORT_OPTIONS = [
  {
    value: "",
    label: "Default",
  },
  {
    value: "title",
    label: "Title",
  },
  {
    value: "price",
    label: "Price",
  },
  {
    value: "rating",
    label: "Rating",
  },
];

export const DEFAULT_PAGE_SIZE = 10;

export const SEARCH_DEBOUNCE_MS = 500;