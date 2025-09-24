"use client";

import { SheetCategoryDetail } from "@/lib/components/sheets/category-detail/sheet";
import { SheetTransactionDetail } from "@/lib/components/sheets/transaction-detail/sheet";

export const RootSheet = () => {
  return (
    <>
      <SheetTransactionDetail />
      <SheetCategoryDetail />
    </>
  );
};
