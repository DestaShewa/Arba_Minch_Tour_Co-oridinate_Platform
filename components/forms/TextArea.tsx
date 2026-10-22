import React from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, hasError, rows = 4, id, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={hasError && id ? `${id}-error` : undefined}
        className={cn(
          "w-full p-3.5 bg-white border rounded-md text-base text-charcoal placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-sand-100 disabled:cursor-not-allowed transition-colors",
          hasError ? "border-red-500 ring-1 ring-red-500" : "border-sand-300",
          className
        )}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";