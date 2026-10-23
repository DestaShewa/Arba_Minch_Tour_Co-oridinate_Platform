"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { PrimaryButton } from "@/components/ui/Button";
import { ShieldCheck, Printer, ArrowRight } from "lucide-react";

export default function ProviderAgreementPage() {
  const clauses = [
    {
      num: 1,
      title: "Provider Identity & Legal Capacity",
      content:
        "The Provider certifies that all personal and business information submitted is accurate and true. The Provider is an independent supplier and not an employee of AMX.",
    },
    {
      num: 2,
      title: "Licenses, Permits & Regulatory Compliance",
      content:
        "The Provider is solely responsible for holding and maintaining all required municipal permits, commercial driving licenses, park guiding association accreditations, and boat registry documentation under Ethiopian law.",
    },
    {
      num: 3,
      title: "Accurate Profile & Pricing Responsibility",
      content:
        "The Provider guarantees that service descriptions, photos, vehicle specifications, and boat capacities provided to AMX are truthful. The Provider agrees not to alter agreed net prices once a trip has been quoted to a customer.",
    },
    {
      num: 4,
      title: "Customer Safety & Equipment Standards",
      content:
        "The Provider accepts legal responsibility for passenger safety during trip execution. Drivers must operate roadworthy vehicles with working seatbelts. Boat operators must provide verified personal flotation life jackets for every passenger before departure on Lake Chamo.",
    },
    {
      num: 5,
      title: "Punctuality & Communication Rules",
      content:
        "Punctuality is mandatory. The Provider must arrive at scheduled pickup points at least 15 minutes before departure. In the event of vehicle breakdown or unavoidable delay, the Provider must notify the AMX coordinator immediately.",
    },
    {
      num: 6,
      title: "Commission & Referral Terms",
      content:
        "The Provider agrees to the commission structure recorded in their profile (e.g., 5%–15% or agreed fixed referral fee). AMX retains this fee as compensation for marketing, coordination, itinerary preparation, and customer support.",
    },
    {
      num: 7,
      title: "Payment Collection & Financial Settlement",
      content:
        "Payment settlement rules are documented on each trip assignment. If AMX collects customer payment, the Provider’s net balance is settled via Telebirr, CBE transfer, or cash on the agreed date. Providers must not solicit unauthorized additional fees from customers.",
    },
    {
      num: 8,
      title: "Cancellation & Refund Obligations",
      content:
        "If a Provider cancels an assigned booking without valid force majeure emergency, the Provider is responsible for coordinating an equivalent substitute through the AMX network or reimbursing any customer holding deposits.",
    },
    {
      num: 9,
      title: "Customer Privacy & Conduct",
      content:
        "Providers receive customer contact numbers solely for executing trip logistics. Providers agree not to spam, harass, or distribute customer WhatsApp details to third parties.",
    },
    {
      num: 10,
      title: "Photo & Marketing Permission",
      content:
        "The Provider grants AMX permission to display verified service photos, vehicle descriptions, and public profile biographies on the AMX marketing platform and quotation documents.",
    },
    {
      num: 11,
      title: "Quality Monitoring & Customer Complaints",
      content:
        "AMX monitors trip completion, punctuality records, and customer feedback. Serious complaints regarding reckless driving, unsafe boat handling, or sobriety violations trigger immediate investigation.",
    },
    {
      num: 12,
      title: "AMX Right to Suspend or Terminate",
      content:
        "AMX reserves the right to suspend or terminate any Provider from the platform for safety violations, failure to honor accepted bookings, license expiration, or conduct harmful to customer safety.",
    },
    {
      num: 13,
      title: "24/7 Emergency Contact Obligation",
      content:
        "The Provider must supply an active, reachable emergency contact (spouse, manager, or colleague) who can be contacted by the AMX duty coordinator if the Provider is out of mobile network range.",
    },
    {
      num: 14,
      title: "Dispute Resolution",
      content:
        "Any disputes regarding trip payments, vehicle delays, or client misunderstandings shall be mediated amicably through the AMX Arba Minch Coordination Desk before formal legal procedures.",
    },
    {
      num: 15,
      title: "Agreement Term & Annual Review",
      content:
        "This agreement takes effect upon submission of registration and remains active for 12 months, subject to annual re-verification of licenses, vehicle inspection, and boat safety equipment.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title="AMX Provider Agreement & Standards"
        description="The binding operational terms between Arba Minch Experiences (AMX) and verified local tourism providers."
        breadcrumb={
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/become-provider" className="hover:underline">For Providers</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Provider Agreement</span>
          </div>
        }
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 flex-1 space-y-8">
        <div className="p-4 rounded-xl bg-sand-100 border border-sand-300 flex items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-primary font-bold">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <span>Official Operating Terms — Version 2026.1</span>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print tap-target px-3 py-1 bg-white hover:bg-sand-200 border border-sand-300 rounded text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print Agreement
          </button>
        </div>

        <div className="bg-white border border-sand-300 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
          <div className="space-y-2 border-b border-sand-200 pb-4">
            <h2 className="text-xl font-bold text-primary">Master Service & Coordination Agreement</h2>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Every local guide, driver, boat captain, lodge, restaurant, and cultural artisan must review and accept these terms during the registration process before their profile goes live.
            </p>
          </div>

          <div className="space-y-6">
            {clauses.map((c) => (
              <div key={c.num} className="space-y-1.5 text-sm">
                <h3 className="font-bold text-charcoal flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-50 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {c.num}
                  </span>
                  <span>{c.title}</span>
                </h3>
                <p className="text-charcoal-muted pl-8 leading-relaxed text-xs sm:text-sm">
                  {c.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-sand-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-charcoal-muted">
              Ready to register your service under these standards?
            </span>
            <Link href="/become-provider/register">
              <PrimaryButton size="md" className="font-bold">
                Continue to Registration <ArrowRight className="w-4 h-4 ml-1.5" />
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}