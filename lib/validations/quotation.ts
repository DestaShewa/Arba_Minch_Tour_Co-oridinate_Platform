import { z } from "zod";

export const QuotationRevisionSchema = z.object({
  quotationNumber: z.string().min(1),
  changeNotes: z
    .string()
    .min(5, "Please describe the changes needed (minimum 5 characters).")
    .max(1000, "Notes are too long."),
  selectedLineItemsToModify: z.array(z.string()).optional(),
});

export type QuotationRevisionType = z.infer<typeof QuotationRevisionSchema>;