export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="animate-pulse">
        <div className="h-14 bg-gray-200" />

        {Array.from({ length: 8 }).map(
          (_, index) => (
            <div
              key={index}
              className="flex gap-4 border-t p-5"
            >
              <div className="h-12 w-12 rounded bg-gray-200" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-3 w-1/4 rounded bg-gray-200" />
              </div>

              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
          )
        )}
      </div>
    </div>
  );
}