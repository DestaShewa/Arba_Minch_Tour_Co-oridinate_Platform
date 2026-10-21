import React from "react";
import { cn } from "@/lib/utils";

// 3. TextArea
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, hasError, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full p-3.5 bg-white border rounded-md text-base text-charcoal placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-sand-100 disabled:cursor-not-allowed transition-colors",
          hasError ? "border-red-500" : "border-sand-300",
          className
        )}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";
