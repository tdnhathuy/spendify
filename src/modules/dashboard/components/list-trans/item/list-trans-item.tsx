"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <Accordion type="single" collapsible>
      <AccordionItem
        value={item.id}
        className="hover:no-underline flex flex-col"
      >
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

          <span className="flex flex-col justify-between items-end h-fit ">
            <ListTransItemAmount transaction={item} />

            <span className="flex gap-2">
              <AccordionTrigger
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "hover:bg-gray-200 rounded-xs p-1 justify-center items-center hidden",
                  !!item.splits && "flex"
                )}
              />
              <PopoverListTrans transaction={item} />
            </span>
          </span>
        </div>

        <AccordionContent className="self-end flex pb-0 justify-end">
          <ListSplit transaction={item} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
