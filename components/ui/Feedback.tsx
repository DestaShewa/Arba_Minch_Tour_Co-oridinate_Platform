import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle, CheckCircle2, Inbox } from "lucide-react";
import { Button } from "./Button";

export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg"; label?: string; className?: string }> = ({
  size = "md",
  label = "Loading...",
  className,
}) => {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("flex flex-col items-center justify-center p-6 space-y-3", className)} role="status">
      <Loader2 className={cn("animate-spin text-primary", sizes[size])} />
      <span className="text-sm text-charcoal-muted font-medium">{label}</span>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export const ErrorMessage: React.FC<{ title?: string; message: string; className?: string }> = ({
  title = "Action could not be completed",
  message,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn("p-4 rounded-lg bg-red-50 border border-red-200 text-red-900 flex items-start gap-3", className)}
    >
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div className="space-y-1 text-sm">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
};

export const SuccessMessage: React.FC<{ title?: string; message: string; className?: string }> = ({
  title = "Success",
  message,
  className,
}) => {
  return (
    <div
      role="status"
      className={cn("p-4 rounded-lg bg-green-50 border border-green-200 text-green-900 flex items-start gap-3", className)}
    >
      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
      <div className="space-y-1 text-sm">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-green-700">{message}</p>
      </div>
    </div>
  );
};

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Inbox className="w-12 h-12 text-sand-400" />,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={cn("p-8 md:p-12 text-center rounded-lg border-2 border-dashed border-sand-300 bg-sand-50 space-y-4", className)}>
      <div className="flex justify-center">{icon}</div>
      <div className="space-y-1 max-w-sm mx-auto">
        <h3 className="text-lg font-bold text-charcoal">{title}</h3>
        <p className="text-sm text-charcoal-muted">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};