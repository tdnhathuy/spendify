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
import { ListTransItemAmount } from "@/modules/dashboard/components/list-trans/item/amount";
import { ListTransItemDesc } from "@/modules/dashboard/components/list-trans/item/desc";
import { ListSplit } from "@/modules/dashboard/components/list-trans/item/list-split";
import { ListTransItemTitle } from "@/modules/dashboard/components/list-trans/item/title";
import { PopoverListTrans } from "@/modules/dashboard/components/list-trans/list-trans-popover";
import { createContext } from "react";
import { BiTransferAlt } from "react-icons/bi";

interface ListTransItemProps {
  item: ITransaction;
}

export const ContextTransItem = createContext<ListTransItemProps>({
  item: {} as ITransaction,
});

export const ListTransItem = ({ item }: ListTransItemProps) => {
  const isTransfer = !!item.transfer;

  const onClickTransaction = () => sheets.open("transaction-detail", item);

  const isSync = !!item.infoSync;

  return (
    <ContextTransItem.Provider value={{ item }}>
      <Accordion type="single" collapsible>
        <AccordionItem
          value={item.id}
          className={cn(
            "hover:no-underline flex flex-col bg-[#f5f5ff] rounded border-l-4 ",
            "transition-all duration-300",
            // "hover:border-green-500 border-green-300",
            isSync && "hover:border-blue-500 border-blue-300"
          )}
        >
          <div
            className={cn("flex gap-2 w-full px-2  py-2 rounded-sm", {
              "bg-red-300 ": item.isAdjust,
            })}
            onClick={onClickTransaction}
          >
            <span className="bg-gray-200 p-2 flex rounded-full h-10 w-10 justify-center items-center ">
              {isTransfer ? (
                <BiTransferAlt />
              ) : (
                <IconPicker
                  icon={item.categoryParent?.icon}
                  disabled
                  size="sm"
                />
              )}
            </span>

            <span className="flex flex-1 flex-col text-xs gap-1">
              <ListTransItemTitle />

              {/* <>
              <span className="flex flex-col items-start gap-1 xs:flex-row xs:gap-2 ">
                <AssignCategory transaction={item} />
                <AssignWallet transaction={item} />
              </span>
            </> */}

              <ListTransItemDesc />
            </span>

            <span className="flex flex-col justify-between items-end h-fit ">
              <ListTransItemAmount />

              <span className="flex gap-2">
                <AccordionTrigger
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "hover:bg-gray-200 rounded-xs p-1 justify-center items-center hidden",
                    !!item.splits && "flex"
                  )}
                />
                <PopoverListTrans />
              </span>
            </span>
          </div>

          <AccordionContent className="self-end flex pb-0 justify-end">
            <ListSplit />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ContextTransItem.Provider>
  );
};
