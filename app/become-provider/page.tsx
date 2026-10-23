import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader, SectionHeading } from "@/components/ui/Typography";
import { PrimaryButton, WhatsAppButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Compass,
  Car,
  Anchor,
  Building2,
  Utensils,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function BecomeProviderPage() {
  const providerCategories = [
    { title: "Tour Guides", icon: <Compass className="w-6 h-6 text-primary" />, desc: "Certified wildlife, culture, and birding guides in Gamo Zone & Nech Sar." },
    { title: "Drivers & 4WD Owners", icon: <Car className="w-6 h-6 text-secondary" />, desc: "Licensed 4WD Land Cruisers, Prados, and HiAce minibuses with roadworthy safety." },
    { title: "Lake Boat Operators", icon: <Anchor className="w-6 h-6 text-secondary" />, desc: "Certified Lake Chamo boat captains equipped with mandatory life jackets." },
    { title: "Hotels & Lodges", icon: <Building2 className="w-6 h-6 text-accent" />, desc: "Ridge lodges, eco-tukuls, and town hotels offering reliable hospitality." },
    { title: "Local Restaurants", icon: <Utensils className="w-6 h-6 text-accent" />, desc: "Fresh Chamo fish kitchens and traditional group dining establishments." },
    { title: "Cultural Artisans", icon: <Sparkles className="w-6 h-6 text-primary" />, desc: "Dorze weaving cooperatives, enset food demonstrators, and heritage groups." },
  ];

  const commissionBreakdown = [
    { category: "Tour Guides", model: "Referral / Package Commission", rate: "10% or fixed fee", settlement: "Settled upon day completion" },
    { category: "Drivers & 4WD Transport", model: "Package Commission", rate: "5% – 10%", settlement: "Fuel & daily fee settled directly" },
    { category: "Boat Operators", model: "Cooperative Charter Rate", rate: "10% – 15%", settlement: "Paid at dock departure" },
    { category: "Hotels & Lodges", model: "Booking Commission", rate: "5% – 10%", settlement: "Direct deposit or voucher settlement" },
    { category: "Restaurants", model: "Group-Booking Referral", rate: "Fixed fee or 5%", settlement: "Paid on dining date" },
    { category: "Cultural Cooperatives", model: "Community Partnership", rate: "Fixed community fee", settlement: "Settled with village leaders" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="Become an AMX Tourism Partner"
        description="Join Arba Minch’s trusted coordination network. Receive confirmed trip assignments with clear itineraries, fair net prices, and local coordinator support."
        actions={
          <Link href="/become-provider/register">
            <PrimaryButton size="md" className="font-bold">
              Start Application →
            </PrimaryButton>
          </Link>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-16">
        {/* Value Proposition Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-sand-300 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-charcoal">Guaranteed Fair Net Prices</h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              You quote your true net price. AMX adds a transparent coordination fee on top. Your earnings are never discounted without your consent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-sand-300 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-secondary-50 text-secondary flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-charcoal">One Responsible Coordinator</h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              No handling customer negotiations or chasing payments. Your assigned AMX coordinator manages schedules, pickup times, and customer briefings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-sand-300 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-accent flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-charcoal">AMX Verified Badge</h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Stand out from unverified directories. Earn the trusted "AMX Verified" badge through physical safety inspections and verified local credentials.
            </p>
          </div>
        </section>

        {/* Provider Categories We Onboard */}
        <section className="space-y-6">
          <SectionHeading
            badge="Categories"
            title="Who Can Become an AMX Provider?"
            subtitle="We onboard verified tourism professionals operating in Arba Minch, Lake Chamo, Dorze highlands, and Nech Sar National Park."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {providerCategories.map((cat, idx) => (
              <Card key={idx} className="p-5 space-y-2 border border-sand-300 bg-white">
                <div className="flex items-center gap-3">
                  {cat.icon}
                  <h4 className="font-bold text-charcoal">{cat.title}</h4>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">{cat.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 3-Step Simple Onboarding Flow */}
        <section className="p-8 sm:p-12 rounded-2xl bg-sand-100 border border-sand-300 space-y-8">
          <SectionHeading
            centered
            badge="Simple Path"
            title="How Provider Onboarding Works"
            subtitle="Straightforward 3-step path to start receiving trip assignments in Arba Minch."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-primary text-warmWhite font-bold text-sm flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-charcoal text-base">Submit Service Profile</h4>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Complete our short registration form with your service details, vehicle/boat specs, standard rates, and ID document.
              </p>
            </div>

            <div className="space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-primary text-warmWhite font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-charcoal text-base">Coordinator Verification</h4>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Within 2 working days, an AMX coordinator reviews your phone, documents, and conducts an in-person vehicle/boat/location check.
              </p>
            </div>

            <div className="space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-primary text-warmWhite font-bold text-sm flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-charcoal text-base">Go Live & Receive Bookings</h4>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Your profile goes live with the "AMX Verified" badge. You start receiving direct trip assignments matching your availability.
              </p>
            </div>
          </div>
        </section>

        {/* Transparent Commission & Pricing Model Table */}
        <section className="space-y-6">
          <div className="space-y-1">
            <SectionHeading
              badge="Transparency"
              title="Commission & Financial Settlement Terms"
              subtitle="Clear partnership terms. We do not publish your confidential net price publicly."
              className="mb-0"
            />
          </div>

          <div className="border border-sand-300 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-normal">
                <thead className="bg-sand-100 border-b border-sand-300 text-charcoal font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Provider Role</th>
                    <th className="py-3.5 px-4">Commercial Model</th>
                    <th className="py-3.5 px-4">Standard Commission</th>
                    <th className="py-3.5 px-4">Settlement Process</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {commissionBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-sand-50/50">
                      <td className="py-3.5 px-4 font-bold text-charcoal">{row.category}</td>
                      <td className="py-3.5 px-4 text-charcoal-muted text-xs sm:text-sm">{row.model}</td>
                      <td className="py-3.5 px-4 font-semibold text-primary text-xs sm:text-sm">{row.rate}</td>
                      <td className="py-3.5 px-4 text-xs text-charcoal-muted">{row.settlement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-muted flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>
              <strong>Confidentiality Guarantee:</strong> Your internal net price is visible only to internal AMX coordinators and is never published publicly to travelers.
            </span>
          </div>
        </section>

        {/* Final Registration CTA */}
        <section className="p-8 sm:p-12 rounded-2xl bg-primary-900 text-warmWhite text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to Join the AMX Verified Network?
            </h3>
            <p className="text-sm text-sand-200 leading-relaxed">
              Start your application now. You only need your basic contact info, service details, and standard ID to begin.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/become-provider/register">
              <PrimaryButton size="lg" className="w-full sm:w-auto font-bold bg-accent hover:bg-accent-600 text-white">
                Start Provider Registration
              </PrimaryButton>
            </Link>
            <WhatsAppButton
              size="lg"
              className="w-full sm:w-auto"
              message="Hello AMX, I am a local provider in Arba Minch and would like to ask questions about joining."
            >
              Talk with Provider Liaison
            </WhatsAppButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}