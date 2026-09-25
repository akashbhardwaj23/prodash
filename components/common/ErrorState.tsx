interface EmptyStateProps {
  title?: string;
  description?: string;
  onRetry? : () => void
}

export default function EmptyState({
  title = "No products found",
  description = "Try changing your search or filters.",
  onRetry
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}