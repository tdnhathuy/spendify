import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaIcon = z.object({
  id: z.string(),
  url: z.string(),
  isDefault: z.boolean(),
});

export const schemaCreateWallet = z.object({
  name: z.string().min(1, { message: "Wallet name is required" }),
  initBalance: z.string().min(1, { message: "Initial balance is required" }),

  icon: schemaIcon.optional().nullable(),
  type: z.enum(["Cash", "Debit", "Credit", "Crypto"]),
  includeInReport: z.boolean().optional(),

  cardNumber: z.string().optional(),
  cardStatementPassword: z.string().optional(),
  cardStatementDate: z.string().optional(),
});

export const resolverCreateWallet = zodResolver(schemaCreateWallet);
export type TypeSchemaCreateWallet = z.infer<typeof schemaCreateWallet>;
