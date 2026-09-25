import ProductSkeleton from "@/components/products/ProductSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <ProductSkeleton />
      </div>
    </main>
  );
}