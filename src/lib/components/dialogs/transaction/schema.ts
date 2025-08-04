import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schemaOption = z.object({
  id: z.string(),
  label: z.string(),
});

export const schemaTransaction = z.object({
  amount: z.string(),
  desc: z.string().optional(),
  date: z.date().optional(),
  category: schemaOption.nullable(),
  wallet: schemaOption.nullable(),

  type: z.enum(["Expense", "Income", "Transfer"]),
});

export const resolverTransaction = zodResolver(schemaTransaction);
export type TypeSchemaTransaction = z.infer<typeof schemaTransaction>;
