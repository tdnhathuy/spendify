import { schemaIcon } from "@/lib/components/dialogs";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaWalletDetail = z.object({
  id: z.string(),
  name: z.string(),
  initBalance: z.string(),
  icon: schemaIcon.nullable(),
});

export const resolverWalletDetail = zodResolver(schemaWalletDetail);
export type TypeSchemaWalletDetail = z.infer<typeof schemaWalletDetail>;
