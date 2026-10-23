"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { SEED_PROVIDER_APPLICATIONS } from "@/data/providerApplications";
import { ArrowLeft } from "lucide-react";

export default function ProviderLoginPage() {
  const router = useRouter();

  const handleSelectProvider = (id: string) => {
    providerOnboardingService.setActiveProviderSession(id);
    router.push("/provider/dashboard");
  };

  return (
    <div className="min-h-screen bg-sand-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary text-warmWhite font-extrabold text-2xl flex items-center justify-center mx-auto shadow-sm">
            A
          </div>
          <h1 className="text-2xl font-bold text-primary">AMX Partner Portal</h1>
          <p className="text-xs text-charcoal-muted">
            Self-service dashboard for verified Arba Minch tourism providers.
          </p>
        </div>

        <Card className="p-6 sm:p-8 border border-sand-300 shadow-md bg-white space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-charcoal">Select Demo Partner Account</h2>
            <p className="text-xs text-charcoal-muted">
              Choose an account to enter the partner workspace:
            </p>
          </div>

          <div className="space-y-3">
            {SEED_PROVIDER_APPLICATIONS.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => handleSelectProvider(app.id)}
                className="tap-target w-full p-4 rounded-xl border border-sand-300 hover:border-primary hover:bg-sand-50/70 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-sm font-bold text-charcoal block">{app.fullName}</strong>
                  <span className="text-xs text-charcoal-muted capitalize">
                    {app.providerType.replace(/_/g, " ")} • {app.cityArea}
                  </span>
                </div>
                <span className="text-xs font-bold text-primary bg-primary-50 px-2.5 py-1 rounded">
                  Login →
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 text-center border-t border-sand-200">
            <Link
              href="/become-provider"
              className="text-xs text-charcoal-muted hover:text-primary inline-flex items-center gap-1 min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to provider information
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}