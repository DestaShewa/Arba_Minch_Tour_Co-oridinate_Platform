import React from "react";
import { cn } from "@/lib/utils";

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
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex justify-between items-baseline">
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-charcoal">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        {helperText && !error && <span className="text-xs text-charcoal-muted">{helperText}</span>}
      </div>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};