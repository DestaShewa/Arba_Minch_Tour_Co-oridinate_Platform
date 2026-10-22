import { Booking, BookingStatus } from "@/types/booking";
import { BOOKINGS } from "@/data/bookings";

const STORAGE_KEY = "amx_bookings_store";

function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") return BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(BOOKINGS));
      return BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return BOOKINGS;
  }
}

function persistBookings(data: Booking[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist bookings", err);
  }
}

export const bookingService = {
  getAll(): Booking[] {
    return getStoredBookings();
  },

  getById(id: string): Booking | undefined {
    const list = getStoredBookings();
    return list.find((b) => b.id === id || b.bookingNumber === id);
  },

  updateStatus(id: string, status: BookingStatus): Booking | undefined {
    const list = getStoredBookings();
    const index = list.findIndex((b) => b.id === id || b.bookingNumber === id);
    if (index === -1) return undefined;

    const updated = { ...list[index], status };
    list[index] = updated;
    persistBookings(list);
    return updated;
  },
};