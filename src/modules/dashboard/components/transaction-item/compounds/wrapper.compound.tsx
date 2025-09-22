import { sheets } from "@/lib/components/sheets/sheet.store";
import { cn } from "@/lib/utils";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import { useCallback } from "react";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isValid, isTransfer, transaction } = useTransactionItem();

  const onClickTransaction = useCallback(
    () => sheets.open("transaction-detail", transaction),
    [transaction]
  );
  return (
    <div
      className={cn(
        "flex gap-2 w-full  px-4  py-3 rounded-sm",
        "hover:no-underline flex  bg-[#f5f5ff] rounded border-l-4 ",
        "transition-all duration-300",
        isValid && "border-blue-500",
        isTransfer && "border-yellow-500"
      )}
      onClick={onClickTransaction}
    >
      {children}
    </div>
  );
};
