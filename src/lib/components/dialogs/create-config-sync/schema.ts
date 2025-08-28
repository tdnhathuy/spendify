import { schemaIcon } from "@/lib/components/dialogs/create-wallet";
import { schemaOption } from "@/lib/components/dialogs/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaConfigSync = z.object({
  email: z.string(),
  wallet: schemaOption,
  icon: schemaIcon,
});

export const resolverConfigSync = zodResolver(schemaConfigSync);
export type TypeSchemaConfigSync = z.infer<typeof schemaConfigSync>;
