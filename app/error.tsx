"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error locally without sensitive user exposure
    console.error("AMX Application Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-warmWhite p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 border border-sand-300 shadow-md bg-white">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-charcoal">
            Something went wrong
          </h2>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            We could not complete your request. Please try again or contact our local coordination desk directly on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <PrimaryButton
            size="md"
            onClick={() => reset()}
            className="w-full font-bold flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </PrimaryButton>

          <WhatsAppButton
            size="md"
            message="Hello AMX, I experienced an issue while accessing my itinerary."
            className="w-full"
          >
            Contact Desk on WhatsApp
          </WhatsAppButton>
        </div>

        <div className="pt-2">
          <Link href="/" className="text-xs text-charcoal-muted hover:text-primary underline">
            Return to Homepage
          </Link>
        </div>
      </Card>
    </div>
  );
}