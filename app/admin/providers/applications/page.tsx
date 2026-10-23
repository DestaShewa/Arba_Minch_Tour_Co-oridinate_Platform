"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProviderAdminSubNav } from "@/components/admin/ProviderAdminSubNav";
import { VerificationStatusBadge } from "@/components/admin/VerificationStatusBadge";
import { AdminTable } from "@/components/layout/AdminTable";
import { EmptyProviderApplicationsState } from "@/components/ui/EmptyStates";
import { providerOnboardingService } from "@/lib/services/providerOnboardingService";
import { ProviderApplication } from "@/types/provider-onboarding";
import { Search } from "lucide-react";

export default function AdminProviderApplicationsPage() {
  const [applications, setApplications] = useState<ProviderApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setApplications(providerOnboardingService.getAllApplications());
  }, []);

  const filtered = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.cityArea.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filterTabs = [
    { label: "All Inbound", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Under Review", value: "under_review" },
    { label: "More Info Needed", value: "more_info_needed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Inbound Provider Applications</h1>
        <p className="text-xs text-charcoal-muted mt-0.5">
          New local guides, drivers, boat operators, and lodges registered via the mobile portal.
        </p>
      </div>

      <ProviderAdminSubNav />

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`tap-target px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                statusFilter === tab.value
                  ? "bg-primary text-warmWhite"
                  : "bg-white text-charcoal border border-sand-300 hover:bg-sand-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-charcoal-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search provider, ref, area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[44px] pl-9 pr-3 py-2 bg-white border border-sand-300 rounded-md text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Applications Table or Empty State */}
      {filtered.length === 0 ? (
        <EmptyProviderApplicationsState
          onReset={() => {
            setStatusFilter("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <AdminTable
          headers={[
            "App # & Provider",
            "Category",
            "Location / Base",
            "Phone / WhatsApp",
            "Submission Date",
            "Verification Status",
            "Reviewer",
            "Action",
          ]}
        >
          {filtered.map((app) => (
            <tr key={app.id} className="hover:bg-sand-50/50">
              <td className="py-3 px-4">
                <span className="text-[10px] font-mono text-accent block font-bold">
                  {app.applicationNumber}
                </span>
                <strong className="text-xs text-charcoal block">{app.fullName}</strong>
                {app.businessName && (
                  <span className="text-[11px] text-charcoal-muted block">{app.businessName}</span>
                )}
              </td>
              <td className="py-3 px-4 text-xs font-semibold uppercase text-secondary-800">
                {app.providerType.replace(/_/g, " ")}
              </td>
              <td className="py-3 px-4 text-xs text-charcoal">{app.cityArea}</td>
              <td className="py-3 px-4 text-xs text-charcoal font-medium">
                {app.phoneNumber}
              </td>
              <td className="py-3 px-4 text-xs text-charcoal-muted">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <VerificationStatusBadge status={app.status} />
              </td>
              <td className="py-3 px-4 text-xs text-charcoal">
                {app.auditChecklist?.reviewerName || "Unassigned"}
              </td>
              <td className="py-3 px-4">
                <Link
                  href={`/admin/providers/${app.id}`}
                  className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center"
                >
                  Inspect & Audit →
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}