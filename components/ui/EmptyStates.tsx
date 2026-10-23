import React from "react";
import { EmptyState } from "@/components/ui/Feedback";
import {
  Inbox,
  CalendarX2,
  Users,
  FileCheck,
  Compass,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

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

// Specialized Provider Onboarding & Portal Empty States
export const EmptyProviderApplicationsState: React.FC<{ onReset?: () => void }> = ({ onReset }) => {
  return (
    <EmptyState
      icon={<Inbox className="w-12 h-12 text-primary" />}
      title="No pending provider applications"
      description="All incoming registrations from local guides, drivers, and lodges have been reviewed or assigned for in-person inspection."
      actionLabel={onReset ? "Show All Applications" : undefined}
      onAction={onReset}
    />
  );
};

export const EmptyAssignedBookingsState: React.FC = () => {
  return (
    <EmptyState
      icon={<CalendarX2 className="w-12 h-12 text-sand-400" />}
      title="No assigned customer trips this week"
      description="Your upcoming traveler schedules, pickup times, and itinerary dossiers will appear here as AMX coordinators assign bookings to your service."
    />
  );
};

export const EmptyDocumentsState: React.FC<{ onUpload?: () => void }> = ({ onUpload }) => {
  return (
    <EmptyState
      icon={<FileCheck className="w-12 h-12 text-sand-400" />}
      title="No verification documents uploaded"
      description="Please upload your Kebele ID, commercial driving license, or boat safety registration so coordinators can verify your profile."
      actionLabel={onUpload ? "Upload Document" : undefined}
      onAction={onUpload}
    />
  );
};