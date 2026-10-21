import React from "react";
import Link from "next/link";
import { AMX_BRAND } from "@/lib/constants";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { ShieldCheck, Clock, Users, MapPin } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-primary-900 text-warmWhite overflow-hidden">
      {/* Background imagery overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 md:py-32">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Arba Minch, Lake Chamo, Dorze & Nech Sar</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {AMX_BRAND.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-warmWhite/90 leading-relaxed font-normal">
            {AMX_BRAND.heroSubheadline}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href="/request">
              <PrimaryButton size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-600 text-white font-bold">
                Request a Trip
              </PrimaryButton>
            </Link>
            <WhatsAppButton
              size="lg"
              message="Hello AMX, I would like to plan a trip to Arba Minch."
              className="w-full sm:w-auto"
            >
              WhatsApp Us
            </WhatsAppButton>
          </div>

          {/* SLA and trust reassurance */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-sand-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent shrink-0" />
              <span>{AMX_BRAND.slaNotice}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Verified local providers</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent shrink-0" />
              <span>One responsible coordinator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

