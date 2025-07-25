import { Icon } from "lucide-react";
import z from "zod";

export const schemaIcon = z.object({
  id: z.string(),
  url: z.string(),
  code: z.string(),
});

export const schemaWallet = z.object({
  name: z.string(),
  initBalance: z.string(),
  icon: schemaIcon.nullable(),
});

export type SchemaWallet = z.infer<typeof schemaWallet>;
