import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/Typography";
import { QuotationClientView } from "@/components/public/QuotationClientView";
import { QUOTATIONS } from "@/data/quotations";

export function generateStaticParams() {
  return QUOTATIONS.map((q) => ({
    id: q.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const quote = QUOTATIONS.find((q) => q.id === id) || QUOTATIONS[0];

  return {
    title: `Quotation ${quote.quotationNumber} | ${quote.customerName}`,
    description: `Itemized travel quotation for ${quote.packageName} in Arba Minch. Verified local providers and clear pricing in ETB.`,
    openGraph: {
      title: `AMX Quotation: ${quote.packageName}`,
      description: `Official quotation for ${quote.customerName} (${quote.travelDates}). Coordinated by AMX Arba Minch.`,
    },
  };
}

export default async function QuotationViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quotation = QUOTATIONS.find((q) => q.id === id) || QUOTATIONS[0];

  if (!quotation) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-warmWhite">
      <Navbar />

      <PageHeader
        title={`Quotation ${quotation.quotationNumber}`}
        description="Review your itemized itinerary costs. Prices are in Ethiopian Birr (ETB) with assigned verified providers."
        breadcrumb={
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">Quotation {quotation.quotationNumber}</span>
          </div>
        }
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 flex-1 w-full">
        <QuotationClientView quotation={quotation} />
      </main>

      <Footer />
    </div>
  );
}