import { formatDate } from "@/lib/helpers";
import { TransactionItemTag } from "@/modules/dashboard/components/transaction-item/base-tag.compound";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";

export const Date = () => {
  const { date } = useTransactionItem();
  const formattedDate = formatDate(date, { format: "HH:mm [-] DD/MM/YYYY " });

  return (
    <TransactionItemTag title={formattedDate!} variant={"date"} icon={null} />
  );
};
