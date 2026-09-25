"use client";

import {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "custom";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-black text-white hover:bg-neutral-800",
    secondary:
      "border border-neutral-300 bg-white text-neutral-700 cursor-pointer hover:bg-neutral-50",
    danger:
      "bg-red-600 text-white border-[2px_2px_1px_1px] border-red-800 !rounded-lg hover:cursor-pointer hover:bg-red-700",
    custom : 
      "bg-transparent text-foreground hover:bg-neutral-200 rounded-[4px] border border-[4px_4px_2px_2px] cursor-pointer"
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        rounded-lg px-4 py-2 text-sm font-medium
        transition disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}