import { sheets } from "@/lib/components/sheets/sheet.store";
import { cn } from "@/lib/utils";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import { useCallback } from "react";

export const Wrapper = ({
  children,
  className,
  isSkeleton = false,
}: {
  children: React.ReactNode;
  isSkeleton?: boolean;
  className?: string | undefined;
}) => {
  const {
    isValid,
    isTransfer,
    transaction,
    isNeedSplit,
    isAdjust,
    isSplit,
    isInitTransaction,
    //
  } = useTransactionItem();

  const onClickTransaction = useCallback(
    () => sheets.open("transaction-detail", transaction),
    [transaction]
  );
  return (
    <div
      className={cn(
        "flex gap-2 w-full px-4 py-3 rounded-sm",
        "hover:no-underline flex  bg-black/15 text-white rounded border-l-4 ",
        "transition-all duration-300",
        "border-gray-700 hover:bg-focus flex-col",
        className,
        isValid && "border-green-500",
        isInitTransaction && "border-blue-500",
        isTransfer && "border-blue-500",
        isSplit && "border-blue-500",
        isNeedSplit && "border-red-500",
        isAdjust && "border-orange-300"
      )}
      onClick={isSkeleton ? undefined : onClickTransaction}
    >
      {children}
    </div>
  );
};
