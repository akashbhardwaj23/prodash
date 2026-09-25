"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="border-b rounded-b-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center gap-10">
          <Link
            href="/products"
            className="text-xl font-bold"
          >
            Product Admin
          </Link>

          <nav className="hidden gap-8 text-sm md:flex">
            <Link
              href="/products"
              className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 hover:rounded-lg hover:border-[1px_1px_0px_0px] p-3"
            >
              Products
            </Link>

            <Link
              href="/products/new"
              className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 hover:rounded-lg hover:border-[1px_1px_0px_0px] p-3"
            >
              Add Product
            </Link>
          </nav>
        </div>

        <Button
          variant="custom"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}