import { ContextTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { use } from "react";
import { formatDate } from "@/lib/helpers";
import { TransactionItemTag } from "@/modules/dashboard/components/transaction-item/components/tag";

export const ListTransItemDesc = () => {
  const { description, date } = use(ContextTransactionItem).item;

  const title = formatDate(date, { format: "HH:mm [-] DD/MM/YYYY " });

  return (
    <span
      className="text-xs flex text-gray-500 line-clamp-2 flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {description && (
        <span className="flex items-center gap-1">
          <HiOutlinePencilSquare />
          <span className="line-clamp-1">{description.repeat(1)}</span>
        </span>
      )}

      <TransactionItemTag title={title!} variant={"date"} />
    </span>
  );
};
