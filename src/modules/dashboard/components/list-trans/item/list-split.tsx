import { IconPicker } from "@/lib/components";
import { formatMoney } from "@/lib/helpers";
import { ITransaction } from "@/lib/types";

export const ListSplit = (props: { transaction: ITransaction }) => {
  const { splits = [] } = props.transaction;

  if (!splits || !splits.length) return null;
  console.log("splits", splits);

  return (
    <div className="w-[90%] px-4 py-2   self-end">
      {splits.map((split) => {
        const amount = formatMoney(split.amount);
        return (
          <span key={split.id} className="flex items-center gap-2">
            <span>{`Split ${amount} to `}</span>
            <IconPicker icon={split.wallet?.icon} disabled size="sm" />
          </span>
        );
      })}
    </div>
  );
};
