import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { AMX_BRAND } from "@/lib/constants";
import { Compass, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-20 flex-1 w-full flex items-center justify-center">
        <Card className="p-8 sm:p-12 border border-sand-300 shadow-sm text-center space-y-6 bg-white w-full">
          <div className="w-16 h-16 rounded-full bg-sand-100 text-primary flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Page or Document Not Found
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              We couldn’t find that Arba Minch page
            </h1>
            <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
              The itinerary, quotation, or page you are looking for may have expired or moved. Your local coordinator can help locate your trip details directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/experiences">
              <PrimaryButton size="md" className="w-full sm:w-auto font-bold">
                Browse Experiences
              </PrimaryButton>
            </Link>
            <WhatsAppButton
              size="md"
              message="Hello AMX, I was looking for my trip page or quotation on your website."
              className="w-full sm:w-auto"
            >
              Ask on WhatsApp
            </WhatsAppButton>
          </div>

          <div className="pt-4 border-t border-sand-200">
            <Link
              href="/"
              className="text-xs text-charcoal-muted hover:text-primary inline-flex items-center gap-1 min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to AMX Homepage
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}