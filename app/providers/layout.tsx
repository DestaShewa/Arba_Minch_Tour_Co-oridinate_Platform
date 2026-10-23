"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProviderSidebar } from "@/components/layout/ProviderSidebar";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication } from "@/types/provider-onboarding";
import { ShieldCheck, Clock, ExternalLink } from "lucide-react";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<ProviderApplication | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  useEffect(() => {
    const active = providerOnboardingService.getActiveProviderSession();
    setSession(active);
  }, []);

  if (!session) {
    return <div className="min-h-screen bg-sand-50 p-8 text-center text-sm">Loading partner workspace...</div>;
  }

  const isVerified = session.status === "verified" || session.status === "trusted";

  return (
    <div className="min-h-screen flex bg-sand-50">
      <ProviderSidebar
        providerName={session.fullName}
        providerType={session.providerType}
        isVerified={isVerified}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Operational Bar */}
        <header className="h-16 bg-white border-b border-sand-300 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {/* Quick Availability Switch */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-charcoal">Available for Bookings:</span>
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`tap-target px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  isAvailable
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {isAvailable ? "● Ready to Accept" : "○ Paused / Unavailable"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-charcoal-muted hover:text-primary flex items-center gap-1 min-h-[44px]"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-sand-200">
              <div className="w-8 h-8 rounded-full bg-primary text-warmWhite flex items-center justify-center font-bold text-xs">
                {session.fullName.substring(0, 2).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-charcoal block leading-none">{session.fullName}</span>
                <span className="text-[10px] text-charcoal-muted">{session.cityArea}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}