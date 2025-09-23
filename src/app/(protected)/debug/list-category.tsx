"use client";

import { useQueryCategory } from "@/lib/api/app.query";
import { GridCategory } from "@/modules/category/components/grid-category";

export const ListCategoryDebug = () => {
  const { expense } = useQueryCategory();

  return <GridCategory data={expense} />;
};
