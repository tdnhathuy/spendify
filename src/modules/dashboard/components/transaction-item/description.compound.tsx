import { useTransactionItem } from "./use-transaction-item";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { formatDate } from "@/lib/helpers";
import { TransactionItemTag } from "./base-tag.compound";

export const ListTransItemDesc = () => {
  const { description, date } = useTransactionItem();

  const formattedDate = formatDate(date, { format: "HH:mm [-] DD/MM/YYYY " });

  return (
    <span
      className="text-xs flex text-gray-500 line-clamp-2 flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {description && (
        <span className="flex items-center gap-1">
          <HiOutlinePencilSquare />
          <span className="line-clamp-1">{description}</span>
        </span>
      )}

      <TransactionItemTag title={formattedDate!} variant={"date"} />
    </span>
  );
};
