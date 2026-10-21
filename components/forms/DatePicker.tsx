import React from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        type="date"
        ref={ref}
        className={cn(
          "w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-md text-base text-charcoal focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-sand-100 disabled:cursor-not-allowed transition-colors",
          hasError ? "border-red-500" : "border-sand-300",
          className
        )}
        {...props}
      />
    );
  }
);
DatePicker.displayName = "DatePicker";