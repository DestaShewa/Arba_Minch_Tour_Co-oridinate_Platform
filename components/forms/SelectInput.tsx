import React from "react";
import { cn } from "@/lib/utils";

// 2. Select Input
export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: { value: string; label: string }[];
}

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, hasError, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-md text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-sand-100 disabled:cursor-not-allowed transition-colors",
          hasError ? "border-red-500" : "border-sand-300",
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
