import { formatMoney, formatTitleDate } from "@/lib/helpers";
import { ITransaction } from "@/lib/types";
import { ListTransGroupProps } from "@/modules/dashboard/components/list-trans/list-trans-group";
import { VscCalendar } from "react-icons/vsc";

export const HeaderListTrans = (props: ListTransGroupProps) => {
  const { data = [], date } = props;

  const fnCal = (acc: number, item: ITransaction) => acc + item.amount;

  const allIncome = data
    .filter(({ category }) => category?.type === "Income")
    .reduce(fnCal, 0);

  const allExpense = data
    .filter(({ category }) => category?.type === "Expense")
    .reduce(fnCal, 0);

  return (
    <span className="flex items-center bg-[#f5f5f6]  w-full px-4 py-1 rounded-sm mb-2 justify-between">
      <span className="flex items-center gap-2">
        <VscCalendar />
        <span className="font-semibold">{formatTitleDate(date)}</span>
      </span>

      <span className="flex gap-0 flex-col text-xs text-right font-semibold">
        <span className="text-red-500">{formatMoney(allExpense)}</span>
        <span className="text-green-500">{formatMoney(allIncome)}</span>
      </span>
    </span>
  );
};
