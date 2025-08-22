import { schemaIcon } from "@/lib/components/dialogs/create-wallet/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaWalletDetail = z.object({
  name: z.string(),
  icon: schemaIcon.optional().nullable(),
  type: z.enum(["Cash", "Debit", "Credit", "Crypto"]),
  initBalance: z.number(),
  currentBalance: z.number(),
  totalTransaction: z.number(),
  cardNumber: z.string().optional().nullable(),
  cardStatementPassword: z.string().optional().nullable(),
  cardStatementDate: z.string().optional().nullable(),
});

export const resolverWallet = zodResolver(schemaWalletDetail);
export type TypeSchemaWallet = z.infer<typeof schemaWalletDetail>;
