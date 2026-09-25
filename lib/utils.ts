export function parsePage(
  value: string | null,
  fallback = 1
): number {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return fallback;
  }

  return page;
}

export function parsePageSize(
  value: string | null,
  fallback = 10
): number {
  const allowed = [10, 20, 50];
  const size = Number(value);

  if (!allowed.includes(size)) {
    return fallback;
  }

  return size;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function calculateTotalPages(
  total: number,
  limit: number
): number {
  if (limit <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(total / limit));
}

export function clampPage(
  page: number,
  totalPages: number
): number {
  return Math.min(Math.max(page, 1), totalPages);
}
