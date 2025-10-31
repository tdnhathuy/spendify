import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaSplitTransaction = z.object({
  wallet: z.string().min(1, { message: "Wallet is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
});

export const resolverSplitTransaction = zodResolver(schemaSplitTransaction);
export type TypeSchemaSplitTransaction = z.infer<typeof schemaSplitTransaction>;
