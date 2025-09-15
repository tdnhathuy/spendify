import { schemaIcon } from "@/lib/components";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schemaCategory = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: schemaIcon.optional(),
  type: z.enum(["Income", "Expense"]).optional(),
});

export const schemaCreateCategory = z.object({
  parent: schemaCategory.optional().nullable(),
  category: schemaCategory.optional().nullable(),
});

export const resolverCreateCategory = zodResolver(schemaCreateCategory);
export type TypeSchemaCreateCategory = z.infer<typeof schemaCreateCategory>;
