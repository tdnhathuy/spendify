import { formatDate } from "@/lib/helpers";
import { WiseTag } from "@/lib/components/wise/wise-tag";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";

export const Date = () => {
  const { date } = useTransactionItem();
  const formattedDate = formatDate(date, { format: "HH:mm [-] DD/MM/YYYY " });

  return (
    <WiseTag title={formattedDate!} variant={"date"} icon={<></>} />
  );
};
