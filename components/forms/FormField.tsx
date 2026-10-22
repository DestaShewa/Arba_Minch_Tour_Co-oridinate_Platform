import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  className,
}) => {
  const errorId = `${htmlFor}-error`;
  const helperId = `${htmlFor}-helper`;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex justify-between items-baseline">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-semibold text-charcoal cursor-pointer"
        >
          {label} {required && <span className="text-red-600 font-bold" aria-hidden="true">*</span>}
        </label>
        {helperText && !error && (
          <span id={helperId} className="text-xs text-charcoal-muted">
            {helperText}
          </span>
        )}
      </div>

      <div>{children}</div>

      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs font-medium text-red-600 flex items-center gap-1.5 mt-1"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};