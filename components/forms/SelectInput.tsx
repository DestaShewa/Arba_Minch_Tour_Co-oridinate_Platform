import React from "react";
import { cn } from "@/lib/utils";

export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: { value: string; label: string }[];
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, hasError, options, id, ...props }, ref) => {
    return (
      <select
        ref={ref}
        id={id}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={hasError && id ? `${id}-error` : undefined}
        className={cn(
          "w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-md text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-sand-100 disabled:cursor-not-allowed transition-colors cursor-pointer",
          hasError ? "border-red-500 ring-1 ring-red-500" : "border-sand-300",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);
SelectInput.displayName = "SelectInput";