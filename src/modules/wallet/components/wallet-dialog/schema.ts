import z from "zod";

export const schemaWallet = z.object({
  name: z.string(),
  initBalance: z.string(),
});
