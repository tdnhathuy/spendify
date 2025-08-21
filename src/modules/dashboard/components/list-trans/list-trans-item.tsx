"use client";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { formatMoney } from "@/lib/helpers/func.helper";
import { ITransaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AssignCategory } from "@/modules/dashboard/components/list-trans/assign-category";
import { AssignWallet } from "@/modules/dashboard/components/list-trans/assign-wallet";
import { PopoverListTrans } from "@/modules/dashboard/components/list-trans/list-trans-popover";
import { useDidUpdate } from "rooks";

interface ListTransItemProps {
  item: ITransaction;
}

export const ListTransItem = ({ item }: ListTransItemProps) => {
  const category = item.categoryParent?.name || "Uncategorized";
  const isIncome = item.categoryParent?.type === "Income";

  useDidUpdate(() => {
    dialogs.open("trans", item);
  }, [item]);

  return (
    <div
      className="flex gap-2 w-full px-0 hover:bg-gray-100 py-2 rounded-sm "
      onClick={() => dialogs.open("trans", item)}
    >
      <span className="bg-gray-100 p-2 flex rounded-full w-fit h-fit ">
        <IconPicker icon={item.categoryParent?.icon} disabled size="sm" />
      </span>

      <span className="flex flex-1 flex-col text-xs gap-1">
        <h1 className=" font-semibold text-sm">{category}</h1>

        <span className="flex flex-col items-start gap-1 xs:flex-row xs:gap-2 ">
          <AssignCategory transaction={item} />
          <AssignWallet transaction={item} />
        </span>

        <span className="text-xs  text-gray-500 line-clamp-2 ">
          {item.description || ""}
        </span>
      </span>

      <span className="flex  flex-col justify-between items-end ">
        <span
          className={cn("font-semibold text-base", {
            "text-green-500": isIncome,
            "text-red-500": !isIncome,
          })}
        >
          {formatMoney(item.amount)}
        </span>

        <PopoverListTrans transaction={item} />
      </span>
    </div>
  );
};
