import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaWallet = z.object({
  name: z.string(),
  icon: z.string(),
  type: z.enum(["Cash", "Debit", "Credit", "Crypto"]),
  initBalance: z.string(),
});

export const resolverWallet = zodResolver(schemaWallet);
export type TypeSchemaWallet = z.infer<typeof schemaWallet>;
