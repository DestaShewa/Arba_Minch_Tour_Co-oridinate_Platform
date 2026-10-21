export type UserRole = "visitor" | "coordinator" | "admin";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}

export interface DashboardMetrics {
  newInquiries: number;
  inquiriesAwaitingResponse: number;
  quotationsSent: number;
  awaitingCustomerConfirmation: number;
  confirmedBookings: number;
  tripsInProgress: number;
  completedTrips: number;
  cancelledBookings: number;
  revenueThisMonthETB: number;
  averageResponseTimeMinutes: number;
}