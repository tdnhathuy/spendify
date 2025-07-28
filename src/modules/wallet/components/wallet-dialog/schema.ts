import z from "zod";

export const schemaIcon = z.object({
  id: z.string(),
  url: z.string(),
  code: z.string(),
});

export const schemaWallet = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  initBalance: z.string().min(1, { message: "Init balance is required" }),
  icon: schemaIcon.nonoptional(),
  type: z.string(),
});

export type SchemaWallet = z.infer<typeof schemaWallet>;
