import { CategoryType } from "@/generated/prisma";
import { formatMoney, formatTitleDate } from "@/lib/helpers";
import { ITransaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ListTransGroupProps } from "@/modules/dashboard/components/list-trans/list-trans-group";
import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
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

  const renderAmount = (amount: number, type: CategoryType = "Income") => {
    const Icon =
      type === "Income" ? (
        <HiOutlineArrowTrendingUp />
      ) : (
        <HiOutlineArrowTrendingDown />
      );
    return (
      <span
        className={cn(
          "text-xs font-medium flex items-center gap-px text-right justify-end",
          {
            "text-green-500": type === "Income",
            "text-red-500": type === "Expense",
          }
        )}
      >
        <span>{formatMoney(Number(amount))}</span>
        {Icon}
      </span>
    );
  };

  return (
    <span className="flex items-center w-full p-2 gap-2 justify-between">
      <span className="flex items-center gap-2">
        <VscCalendar />
        <span className="font-semibold">{formatTitleDate(date)}</span>
      </span>

      <span className="flex gap-px flex-col ">
        {renderAmount(allIncome, "Income")}
        {renderAmount(allExpense, "Expense")}
      </span>
    </span>
  );
};
