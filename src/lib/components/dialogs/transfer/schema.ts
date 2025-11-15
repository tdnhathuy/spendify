import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaTransfer = z.object({
  idWalletFrom: z.string().nullable(),
  idWalletTo: z.string().nullable(),

  amount: z.string(),

  idTransaction: z.string().nullable(),
});

export const resolverTransfer = zodResolver(schemaTransfer);
export type TypeSchemaTransfer = z.infer<typeof schemaTransfer>;
