import { IconPicker } from "@/lib/components";
import { formatMoney } from "@/lib/helpers";
import { ContextTransItem } from "@/modules/dashboard/components/list-trans/item/list-trans-item";
import { use } from "react";

export const ListSplit = () => {
  const { item: transaction } = use(ContextTransItem);
  const { splits = [] } = transaction;

  if (!splits || !splits.length) return null;

  return (
    <div className="w-[90%] px-4 py-2 self-end ">
      {splits.map((split) => {
        const amount = formatMoney(split.amount);
        return (
          <span key={split.id} className="flex items-center gap-2 ">
            <span>{`Split ${amount} to `}</span>
            <IconPicker icon={split.wallet?.icon} disabled size="sm" />
          </span>
        );
      })}
    </div>
  );
};
