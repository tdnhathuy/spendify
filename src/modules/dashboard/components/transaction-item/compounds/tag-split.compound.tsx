"use client";

import { Popover, PopoverAnchor } from "@/components/ui/popover";
import { ITransactionSplit } from "@/lib/types";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";
import { removeSplit } from "@/server/actions/wallet.action";
import { useState } from "react";
import { LuSplit } from "react-icons/lu";
import { WiseTag } from "../../../../../lib/components/wise/wise-tag";

export const TagSplit = () => {
  const { transaction, isSplit } = useTransactionItem();
  const [open, setOpen] = useState(false);
  return null;

  const onClickRemoveSplit = (split: ITransactionSplit) => async () => {
    try {
      setOpen(false);
      await removeSplit(split.id);
    } catch (error) {
      console.error("Failed to remove split:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverAnchor>
        <WiseTag
          icon={<LuSplit />}
          title="Split"
          variant="split"
          onClick={(e) => {
            e.stopPropagation();
            if (open) return;
            setOpen((e) => !e);
          }}
        />
      </PopoverAnchor>

      {/* <WisePopoverContent
        side="bottom"
        className="w-fit gap-2 flex flex-col py-2"
      >
        {transaction.splits.map((split) => {
          const amount = formatMoney(split.amount);
          return (
            <div
              key={split.id}
              className="flex gap-2 items-center text-sm font-semibold w-48 justify-between"
            >
              <span className="flex items-center gap-2">
                <IconPicker icon={split.wallet?.icon} size="sm" disabled />
                <span>{`Split ${amount} to`}</span>
              </span>

              <button
                className="cursor-pointer"
                tabIndex={-1}
                onClick={onClickRemoveSplit(split)}
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </WisePopoverContent> */}
    </Popover>
  );
};
