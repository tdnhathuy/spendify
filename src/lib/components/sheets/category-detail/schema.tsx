import { schemaCategory } from "@/lib/components/sheets/transaction-detail/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const schemaCategoryDetail = z.object({
  category: schemaCategory.nullable().optional(),
  parent: schemaCategory.nullable().optional(),
});

export const resolverCategoryDetail = zodResolver(schemaCategoryDetail);
export type TypeSchemaCategoryDetail = z.infer<typeof schemaCategoryDetail>;
