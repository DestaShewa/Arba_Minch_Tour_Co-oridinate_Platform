import { Provider, ProviderRole } from "@/types/provider";
import { PROVIDERS } from "@/data/providers";

const STORAGE_KEY = "amx_providers_store";

function getStoredProviders(): Provider[] {
  if (typeof window === "undefined") return PROVIDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PROVIDERS));
      return PROVIDERS;
    }
    return JSON.parse(raw);
  } catch {
    return PROVIDERS;
  }
}

function persistProviders(data: Provider[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist providers", err);
  }
}

export const providerService = {
  getAll(): Provider[] {
    return getStoredProviders();
  },

  getByRole(role: ProviderRole): Provider[] {
    return getStoredProviders().filter((p) => p.role === role);
  },

  getByIdOrSlug(identifier: string): Provider | undefined {
    return getStoredProviders().find(
      (p) => p.id === identifier || p.slug === identifier
    );
  },

  toggleAvailability(id: string): Provider | undefined {
    const list = getStoredProviders();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const updated = { ...list[index], isAvailable: !list[index].isAvailable };
    list[index] = updated;
    persistProviders(list);
    return updated;
  },
};