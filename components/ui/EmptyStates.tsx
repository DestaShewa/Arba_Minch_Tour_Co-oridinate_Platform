import React from "react";
import { EmptyState } from "@/components/ui/Feedback";
import { Inbox, CalendarX2, Users, Compass } from "lucide-react";

export const EmptyInquiriesState: React.FC<{ onRefresh?: () => void }> = ({ onRefresh }) => {
  return (
    <EmptyState
      icon={<Inbox className="w-12 h-12 text-sand-400" />}
      title="No new inquiries yet"
      description="All customer trip requests have been assigned to coordinators or answered."
      actionLabel={onRefresh ? "Refresh Inquiries" : undefined}
      onAction={onRefresh}
    />
  );
};

export const EmptyBookingsState: React.FC = () => {
  return (
    <EmptyState
      icon={<CalendarX2 className="w-12 h-12 text-sand-400" />}
      title="No confirmed bookings this week"
      description="Active itineraries will appear here once customers accept their quotations."
    />
  );
};

export const EmptyProvidersState: React.FC<{ onReset?: () => void }> = ({ onReset }) => {
  return (
    <EmptyState
      icon={<Users className="w-12 h-12 text-sand-400" />}
      title="No providers found"
      description="No verified guides, drivers, or boat operators currently match the selected filter."
      actionLabel={onReset ? "Show All Providers" : undefined}
      onAction={onReset}
    />
  );
};