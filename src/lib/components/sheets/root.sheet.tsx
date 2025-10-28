"use client";

import { SheetCategoryDetail } from "@/lib/components/sheets/category-detail/sheet";
import { SheetTransactionDetail } from "@/lib/components/sheets/transaction-detail/sheet";
import { SheetWalletDetail } from "@/lib/components/sheets/wallet-detail/sheet";

export const RootSheet = () => {
  return (
    <>
      <SheetTransactionDetail />
      <SheetCategoryDetail />
      <SheetWalletDetail />
    </>
  );
};
