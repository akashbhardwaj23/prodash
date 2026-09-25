import {
  SelectHTMLAttributes,
} from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export default function Select({
  label,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-600">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`
          rounded-lg border-[2px_2px_1px_1px] border-neutral-200
          bg-background px-3 py-2 text-sm
          outline-none
          focus:border-sky-200
          ${className}
        `}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}