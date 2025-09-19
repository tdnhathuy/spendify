import { Popover, PopoverContent } from "@/components/ui/popover";
import { TransactionItemTag } from "@/modules/dashboard/components/transaction-item/components/tag";
import { ContextTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { use, useState } from "react";
import { LuSplit } from "react-icons/lu";

export const TagSplit = () => {
  const { transaction } = use(ContextTransactionItem);
  const [open, setOpen] = useState(true);

  if (!transaction.splits || transaction.splits.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TransactionItemTag
        icon={<LuSplit />}
        title="Split"
        variant="split"
        onClick={() => {
          console.log("1", 1);
          setOpen(true);
        }}
      />

      <PopoverContent>
        <span>1</span>
      </PopoverContent>
    </Popover>
  );
};
