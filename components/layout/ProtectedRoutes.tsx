"use client";

import {
  ReactNode,
  useEffect,
} from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {
    isAuthenticated,
    loading,
  } = useAuth();

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated
    ) {
      router.replace("/login");
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

   if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">
          Checking authentication...
        </div>
      </div>
    );
  }

  // Don't render protected content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}