"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminTable } from "@/components/layout/AdminTable";
import { StatusBadge } from "@/components/ui/Badge";
import { SLACountdownBadge } from "@/components/admin/SLACountdownBadge";
import { TextInput } from "@/components/forms/TextInput";
import { inquiryService } from "@/lib/services/inquiryService";
import { TripInquiry } from "@/types/inquiry";
import { Search, Plus } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<TripInquiry[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setInquiries(inquiryService.getAll());
  }, []);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = selectedFilter === "all" || inq.status === selectedFilter;
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterTabs: { label: string; value: string }[] = [
    { label: "All Inquiries", value: "all" },
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Awaiting Provider", value: "awaiting_provider" },
    { label: "Quotation Sent", value: "quotation_sent" },
    { label: "Confirmed", value: "confirmed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Inquiries Roster</h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Manage trip requests and coordinator response assignments.
          </p>
        </div>
        <Link
          href="/request"
          target="_blank"
          className="text-xs font-semibold bg-primary hover:bg-primary-700 text-warmWhite px-4 py-2.5 rounded-md inline-flex items-center gap-1.5 shadow-sm min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>New Manual Request</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="flex flex-wrap gap-1.5 border-b md:border-b-0 border-sand-300 pb-2 md:pb-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedFilter(tab.value)}
              className={`tap-target px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                selectedFilter === tab.value
                  ? "bg-primary text-warmWhite"
                  : "bg-white text-charcoal border border-sand-300 hover:bg-sand-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-charcoal-muted" />
          <TextInput
            placeholder="Search customer or ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      <AdminTable
        headers={[
          "Ref & Customer",
          "Package",
          "Travel Date",
          "Status",
          "SLA Window",
          "Assigned Coordinator",
          "Next Action",
          "Action",
        ]}
      >
        {filteredInquiries.map((inq) => (
          <tr key={inq.id} className="hover:bg-sand-50/50">
            <td className="py-3 px-4">
              <span className="text-[10px] font-mono text-accent block font-bold">
                {inq.referenceNumber}
              </span>
              <strong className="text-charcoal block">{inq.fullName}</strong>
              <span className="text-xs text-charcoal-muted">{inq.whatsappNumber}</span>
            </td>
            <td className="py-3 px-4 text-xs font-medium text-charcoal max-w-[140px] truncate">
              {inq.packageSlug?.replace(/-/g, " ") || "Custom Trip"}
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">{inq.travelDate}</td>
            <td className="py-3 px-4">
              <StatusBadge status={inq.status} />
            </td>
            <td className="py-3 px-4">
              <SLACountdownBadge createdAt={inq.createdAt} status={inq.status} />
            </td>
            <td className="py-3 px-4 text-xs text-charcoal">
              {inq.assignedCoordinator || "Unassigned"}
            </td>
            <td className="py-3 px-4 text-xs text-secondary-800 font-medium max-w-[180px] truncate">
              {inq.nextAction}
            </td>
            <td className="py-3 px-4">
              <Link
                href={`/admin/inquiries/${inq.id}`}
                className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center"
              >
                Inspect →
              </Link>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}