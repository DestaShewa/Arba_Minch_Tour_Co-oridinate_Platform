import { z } from "zod";
import { isValidWhatsAppNumber } from "@/lib/utils";

export const InquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name is too long."),
  whatsappNumber: z.string().refine((val) => isValidWhatsAppNumber(val), {
    message: "Please enter a valid WhatsApp number (e.g. +251 911 000 000 or 0911000000).",
  }),
  travelDate: z.string().min(1, "Please select your planned travel date."),
  numberOfTravelers: z.coerce
    .number()
    .min(1, "At least 1 traveler is required.")
    .max(30, "For groups over 30, please contact coordinator desk directly."),
  packageSlug: z.string().min(1, "Please select an experience."),
  
  // Optional Fields
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  numberOfDays: z.coerce.number().min(1).max(30).optional(),
  budgetRangeETB: z.string().max(100).optional(),
  arrivalLocation: z.string().max(100).optional(),
  hotelNeeded: z.boolean().default(false),
  transportNeeded: z.boolean().default(true),
  specialRequirements: z.string().max(1000).optional(),
});

export type InquiryFormSchemaType = z.infer<typeof InquirySchema>;