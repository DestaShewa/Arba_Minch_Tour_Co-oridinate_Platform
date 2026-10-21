"use client";

import React from "react";
import Link from "next/link";
import { AdminStatCard } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { AdminTable } from "@/components/layout/AdminTable";
import { INQUIRIES } from "@/data/inquiries";
import { BOOKINGS } from "@/data/bookings";
import { QUOTATIONS } from "@/data/quotations";
import { formatETB } from "@/lib/utils";
import {
  Inbox,
  Clock,
  Send,
  UserCheck,
  CheckCircle2,
  Navigation,
  CheckCheck,
  XCircle,
  TrendingUp,
  Timer,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  // Compute the 10 prompt-required metrics
  const newInquiriesCount = INQUIRIES.filter((i) => i.status === "new").length;
  const awaitingResponseCount = INQUIRIES.filter(
    (i) => i.status === "new" || i.status === "contacted"
  ).length;
  const quotationsSentCount = QUOTATIONS.filter((q) => q.status === "sent").length;
  const awaitingCustomerConfirmationCount = INQUIRIES.filter(
    (i) => i.status === "quotation_sent"
  ).length;
  const confirmedBookingsCount = BOOKINGS.filter(
    (b) => b.status === "confirmed"
  ).length;
  const tripsInProgressCount = BOOKINGS.filter(
    (b) => b.status === "in_progress"
  ).length;
  const completedTripsCount = BOOKINGS.filter(
    (b) => b.status === "completed"
  ).length;
  const cancelledBookingsCount = BOOKINGS.filter(
    (b) => b.status === "cancelled"
  ).length;
  const revenueThisMonthETB = 68000; // Total ETB revenue collected
  const avgResponseTimeMinutes = 18; // Under the 30-min SLA promise

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
          Operations Dashboard
        </h1>
        <p className="text-sm text-charcoal-muted mt-1">
          Real-time coordination status for Arba Minch experiences.
        </p>
      </div>

      {/* 10 Required Dashboard Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <AdminStatCard
          title="New Inquiries"
          value={newInquiriesCount}
          subtitle="Awaiting first review"
          icon={<Inbox className="w-5 h-5" />}
          trend="+2 today"
        />

        {/* Metric 2 */}
        <AdminStatCard
          title="Awaiting Response"
          value={awaitingResponseCount}
          subtitle="Within 30-min window"
          icon={<Clock className="w-5 h-5" />}
        />

        {/* Metric 3 */}
        <AdminStatCard
          title="Quotations Sent"
          value={quotationsSentCount}
          subtitle="Active proposals"
          icon={<Send className="w-5 h-5" />}
        />

        {/* Metric 4 */}
        <AdminStatCard
          title="Awaiting Customer"
          value={awaitingCustomerConfirmationCount}
          subtitle="Quotes in review"
          icon={<UserCheck className="w-5 h-5" />}
        />

        {/* Metric 5 */}
        <AdminStatCard
          title="Confirmed Bookings"
          value={confirmedBookingsCount}
          subtitle="Upcoming trips"
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
        />

        {/* Metric 6 */}
        <AdminStatCard
          title="Trips In Progress"
          value={tripsInProgressCount}
          subtitle="Currently traveling"
          icon={<Navigation className="w-5 h-5 text-secondary" />}
        />

        {/* Metric 7 */}
        <AdminStatCard
          title="Completed Trips"
          value={completedTripsCount}
          subtitle="Past 30 days"
          icon={<CheckCheck className="w-5 h-5 text-primary" />}
        />

        {/* Metric 8 */}
        <AdminStatCard
          title="Cancelled Trips"
          value={cancelledBookingsCount}
          subtitle="Total this month"
          icon={<XCircle className="w-5 h-5 text-red-500" />}
        />

        {/* Metric 9 */}
        <AdminStatCard
          title="Month Revenue"
          value={formatETB(revenueThisMonthETB)}
          subtitle="Settled ETB bookings"
          icon={<TrendingUp className="w-5 h-5 text-accent" />}
        />

        {/* Metric 10 */}
        <AdminStatCard
          title="Avg Response Time"
          value={`${avgResponseTimeMinutes} min`}
          subtitle="Target: under 30 min"
          icon={<Timer className="w-5 h-5 text-green-600" />}
          trend="Within SLA"
        />
      </div>

      {/* Priority Inquiries Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold text-primary">
              Recent Inquiries Requiring Action
            </h2>
            <p className="text-xs text-charcoal-muted">
              Sorted by submission time. Ensure response within 30 minutes.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 min-h-[44px]"
          >
            <span>View All ({INQUIRIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <AdminTable
          headers={[
            "Customer",
            "Package",
            "Travel Date",
            "Travelers",
            "Status",
            "Next Action",
            "Action",
          ]}
        >
          {INQUIRIES.slice(0, 4).map((inq) => (
            <tr key={inq.id} className="hover:bg-sand-50/50">
              <td className="py-3 px-4">
                <strong className="text-charcoal block">{inq.fullName}</strong>
                <span className="text-xs text-charcoal-muted">
                  {inq.whatsappNumber}
                </span>
              </td>
              <td className="py-3 px-4 text-xs font-medium text-charcoal">
                {inq.packageSlug?.replace(/-/g, " ")}
              </td>
              <td className="py-3 px-4 text-xs text-charcoal">
                {inq.travelDate}
              </td>
              <td className="py-3 px-4 text-xs text-charcoal">
                {inq.numberOfTravelers} Guests
              </td>
              <td className="py-3 px-4">
                <StatusBadge status={inq.status} />
              </td>
              <td className="py-3 px-4 text-xs text-charcoal-muted max-w-[200px] truncate">
                {inq.nextAction}
              </td>
              <td className="py-3 px-4">
                <Link
                  href={`/admin/inquiries/${inq.id}`}
                  className="text-xs font-bold text-primary hover:underline min-h-[44px] inline-flex items-center"
                >
                  Manage →
                </Link>
              </td>
            </tr>
          ))}
        </AdminTable>
      </section>
    </div>
  );
}