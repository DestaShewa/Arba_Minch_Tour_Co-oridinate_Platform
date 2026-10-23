"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { TextArea } from "@/components/forms/TextArea";
import { PrimaryButton } from "@/components/ui/Button";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication } from "@/types/provider-onboarding";
import { CheckCircle2 } from "lucide-react";

export default function ProviderProfilePage() {
  const [session, setSession] = useState<ProviderApplication | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSession(providerOnboardingService.getActiveProviderSession());
  }, []);

  if (!session) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Public Profile & Bio</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">Information displayed on your AMX verified profile page.</p>
      </div>

      {saved && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-900 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>Profile changes saved.</span>
        </div>
      )}

      <Card className="p-6 bg-white border border-sand-300 space-y-6 max-w-2xl">
        <FormField label="Full Name" htmlFor="fullName" required>
          <TextInput id="fullName" value={session.fullName} readOnly className="bg-sand-50" />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Phone Number" htmlFor="phone">
            <TextInput id="phone" value={session.phoneNumber} readOnly className="bg-sand-50" />
          </FormField>
          <FormField label="WhatsApp Number" htmlFor="wa">
            <TextInput id="wa" value={session.whatsappNumber} readOnly className="bg-sand-50" />
          </FormField>
        </div>

        <FormField label="Operating Base / City Area" htmlFor="city">
          <TextInput id="city" value={session.cityArea} readOnly className="bg-sand-50" />
        </FormField>

        <FormField label="Emergency Contact (24/7)" htmlFor="emergency">
          <TextInput
            id="emergency"
            value={`${session.emergencyContact.name} (${session.emergencyContact.relationship}) — ${session.emergencyContact.phone}`}
            readOnly
            className="bg-sand-50"
          />
        </FormField>

        <PrimaryButton onClick={() => setSaved(true)} className="font-bold">
          Save Profile Details
        </PrimaryButton>
      </Card>
    </div>
  );
}