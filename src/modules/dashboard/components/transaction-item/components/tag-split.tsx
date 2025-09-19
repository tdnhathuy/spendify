import { Popover, PopoverAnchor } from "@/components/ui/popover";
import { IconPicker, WisePopoverContent } from "@/lib/components";
import { formatMoney } from "@/lib/helpers";
import { TransactionItemTag } from "@/modules/dashboard/components/transaction-item/components/tag";
import { ContextTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { use, useState } from "react";
import { LuSplit } from "react-icons/lu";

export const TagSplit = () => {
  const { transaction } = use(ContextTransactionItem);
  const [open, setOpen] = useState(false);

  if (!transaction.splits || transaction.splits.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverAnchor>
        <TransactionItemTag
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

      <WisePopoverContent
        side="bottom"
        className="w-fit gap-2 flex flex-col py-2"
      >
        {transaction.splits.map((split) => {
          const amount = formatMoney(split.amount);
          return (
            <span
              key={split.id}
              className="flex gap-2 items-center text-sm font-semibold"
            >
              <span>{`Split ${amount} to`}</span>
              <IconPicker icon={split.wallet?.icon} size="sm" disabled />
            </span>
          );
        })}
      </WisePopoverContent>
    </Popover>
  );
};
