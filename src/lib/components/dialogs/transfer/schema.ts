import { schemaIcon } from "@/lib/components/dialogs/create-wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schemaWallet = z.object({
  id: z.string(),
  name: z.string(),
  currentBalance: z.string(),
  icon: schemaIcon.nullable().optional(),
});

export const schemaTransfer = z.object({
  walletFrom: schemaWallet.nullable().optional(),
  walletTo: schemaWallet.nullable().optional(),
  amount: z.string(),
});

export const resolverTransfer = zodResolver(schemaTransfer);
export type TypeSchemaTransfer = z.infer<typeof schemaTransfer>;
