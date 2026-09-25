"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";

export default function HomePage() {
  const router = useRouter();

  const {
    isAuthenticated,
    loading,
  } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isAuthenticated) {
      router.replace("/products");
    } else {
      router.replace("/login");
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  return <Loader />;
}