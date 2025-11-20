import { CategoryType } from "@/generated/prisma";
import { schemaIcon } from "@/lib/components/dialogs";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schemaWallet = z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  icon: schemaIcon.optional().nullable(),
});

export const schemaCategory = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(1),
  icon: schemaIcon,
  type: z.enum([CategoryType.Income, CategoryType.Spend]).optional().nullable(),
});

export const schemaTransactionDetail = z.object({
  amount: z.string(),
  desc: z.string().optional(),
  date: z.date().optional(),
  note: z.string().optional(),

  category: schemaCategory.nullable().optional(),
  wallet: schemaWallet.nullable().optional(),

  type: z.enum(["Expense", "Income", "Other"]),
});

export const resolverTransactionDetail = zodResolver(schemaTransactionDetail);
export type TypeSchemaTransactionDetail = z.infer<
  typeof schemaTransactionDetail
>;
