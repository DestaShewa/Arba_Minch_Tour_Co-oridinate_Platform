"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/forms/TextInput";
import { PrimaryButton } from "@/components/ui/Button";
import { AMX_BRAND } from "@/lib/constants";
import { ShieldCheck, Lock, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("coordinator@amx.et");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-sand-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary text-warmWhite font-extrabold text-2xl flex items-center justify-center mx-auto shadow-sm">
            A
          </div>
          <h1 className="text-2xl font-bold text-primary">
            AMX Coordinator Portal
          </h1>
          <p className="text-xs text-charcoal-muted">
            Internal operations desk for Arba Minch Experiences.
          </p>
        </div>

        <Card className="p-6 sm:p-8 border border-sand-300 shadow-md bg-white space-y-6">
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              <strong>Front-End MVP Preview:</strong> Real database authentication is not implemented in this version. Click below to enter with simulated session credentials.
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <FormField label="Coordinator Email" htmlFor="email">
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Access Password" htmlFor="password">
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormField>

            <PrimaryButton
              type="submit"
              size="lg"
              isLoading={loading}
              className="w-full font-bold mt-2"
            >
              Sign In to Coordinator Desk
            </PrimaryButton>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-charcoal-muted hover:text-primary inline-flex items-center gap-1 min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to public website
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}