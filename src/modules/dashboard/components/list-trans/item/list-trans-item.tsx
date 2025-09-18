"use client";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { ITransaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AssignCategory } from "@/modules/dashboard/components/list-trans/assign-category";
import { AssignWallet } from "@/modules/dashboard/components/list-trans/assign-wallet";
import { ListTransItemAmount } from "@/modules/dashboard/components/list-trans/item/amount";
import { ListSplit } from "@/modules/dashboard/components/list-trans/item/list-split";
import { ListTransItemTitle } from "@/modules/dashboard/components/list-trans/item/title";
import { PopoverListTrans } from "@/modules/dashboard/components/list-trans/list-trans-popover";
import { BiTransferAlt } from "react-icons/bi";

interface ListTransItemProps {
  item: ITransaction;
}

export const ListTransItem = ({ item }: ListTransItemProps) => {
  const isTransfer = !!item.transfer;

  const onClickTransaction = () => sheets.open("transaction-detail", item);

  return (
    <>
      <div
        className={cn(
          "flex gap-2 w-full px-2 hover:bg-gray-100 py-2 rounded-sm",
          { "bg-red-300 ": item.isAdjust }
        )}
        onClick={onClickTransaction}
      >
        <span className="bg-gray-200 p-2 flex rounded-full h-10 w-10 justify-center items-center ">
          {isTransfer ? (
            <BiTransferAlt />
          ) : (
            <IconPicker icon={item.categoryParent?.icon} disabled size="sm" />
          )}
        </span>

        <span className="flex flex-1 flex-col text-xs gap-1">
          <ListTransItemTitle transaction={item} />

          <>
            <span className="flex flex-col items-start gap-1 xs:flex-row xs:gap-2 ">
              <AssignCategory transaction={item} />
              <AssignWallet transaction={item} />
            </span>

            <span className="text-xs  text-gray-500 line-clamp-2 ">
              {item.description || ""}
            </span>
          </>
        </span>

        <span className="flex  flex-col justify-between items-end ">
          <ListTransItemAmount transaction={item} />
          <PopoverListTrans transaction={item} />
        </span>
      </div>

      <ListSplit transaction={item} />
    </>
  );
};
