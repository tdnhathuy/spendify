"use client";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { dialogs, WiseButton } from "@/lib/components";
import { PopoverFilterTransaction } from "@/modules/dashboard/components/transaction-filter/filter-transaction.popover";

export const HeaderRight = () => {
  return (
    <div className="flex gap-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <WiseButton className="h-6" size={"sm"}>
            Filter
          </WiseButton>
        </PopoverTrigger>

        <PopoverFilterTransaction />
      </Popover>

      <WiseButton
        onClick={() => dialogs.open("create-trans")}
        className="h-6"
        size={"sm"}
      >
        Create
      </WiseButton>
    </div>
  );
};
