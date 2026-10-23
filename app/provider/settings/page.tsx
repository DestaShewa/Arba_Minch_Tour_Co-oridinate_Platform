"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, FileText } from "lucide-react";

export default function ProviderSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Settings & Agreement Records</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Your signed operational agreement and notification preferences.</p>
      </div>

      <Card className="p-6 bg-white border border-sand-300 space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-charcoal">AMX Provider Operating Agreement</h2>
        </div>

        <div className="p-4 bg-sand-50 rounded-xl space-y-2 text-xs text-charcoal-muted leading-relaxed">
          <p>
            You accepted the binding <strong>AMX Provider Agreement (Version 2026.1)</strong> upon registration.
          </p>
          <p>
            Agreed commission: <strong>10% package commission</strong>. Punctuality guarantee: <strong>15-minute advance arrival</strong>.
          </p>
          <div className="pt-2">
            <Link href="/provider-agreement" target="_blank" className="text-primary font-bold hover:underline flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Read Full Signed Agreement Terms</span>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}