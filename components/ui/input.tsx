import {
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-600">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full rounded-lg border-[1px_1px_2px_2px]
          px-3 py-2.5 text-sm
          outline-none transition
          focus:border-sky-200 focus:ring-1
          focus:ring-sky-100
          ${
            error
              ? "border-red-500"
              : "border-neutral-300"
          }
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}