import { Quotation } from "@/types/quotation";
import { QUOTATIONS } from "@/data/quotations";

const STORAGE_KEY = "amx_quotations_store";

function getStoredQuotations(): Quotation[] {
  if (typeof window === "undefined") return QUOTATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(QUOTATIONS));
      return QUOTATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return QUOTATIONS;
  }
}

function persistQuotations(data: Quotation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist quotations", err);
  }
}

export const quotationService = {
  getAll(): Quotation[] {
    return getStoredQuotations();
  },

  getById(id: string): Quotation | undefined {
    const list = getStoredQuotations();
    return list.find((q) => q.id === id || q.quotationNumber === id);
  },

  accept(id: string): Quotation | undefined {
    const list = getStoredQuotations();
    const index = list.findIndex((q) => q.id === id || q.quotationNumber === id);
    if (index === -1) return undefined;

    const updated: Quotation = {
      ...list[index],
      status: "accepted",
    };
    list[index] = updated;
    persistQuotations(list);
    return updated;
  },

  requestChanges(id: string, notes: string): Quotation | undefined {
    const list = getStoredQuotations();
    const index = list.findIndex((q) => q.id === id || q.quotationNumber === id);
    if (index === -1) return undefined;

    const updated: Quotation = {
      ...list[index],
      status: "changes_requested",
    };
    list[index] = updated;
    persistQuotations(list);
    return updated;
  },
};