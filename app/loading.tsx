import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <span className="text-sm font-semibold text-charcoal-muted">
        Loading Arba Minch experiences...
      </span>
      <span className="sr-only">Content is loading, please wait.</span>
    </div>
  );
}