import { schemaOption } from "@/lib/components/dialogs/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaWallet = z.object({
  name: z.string(),
  icon: schemaOption,
  type: z.enum(["Cash", "Debit", "Credit", "Crypto"]),
  initBalance: z.string(),
  currentBalance: z.number(),
});

export const resolverWallet = zodResolver(schemaWallet);
export type TypeSchemaWallet = z.infer<typeof schemaWallet>;
