import { formatMoney, formatTitleDate } from "@/lib/helpers";
import { ITransaction } from "@/lib/types";
import { ListTransItem } from "@/modules/dashboard/components/list-trans/list-trans-item";

interface Props {
  data: ITransaction[];
  date: string;
}

export const ListTransGroup = ({ data = [], date }: Props) => {
  const fnCal = (acc: number, item: ITransaction) => acc + item.amount;

  const allIncome = data
    .filter(({ category }) => category?.type === "Income")
    .reduce(fnCal, 0);

  const allExpense = data
    .filter(({ category }) => category?.type === "Expense" || !category)
    .reduce(fnCal, 0);

  return (
    <div className="w-lg">
      <span className="flex items-center bg-[#f5f5f6] w-full px-4 py-1 rounded-sm mb-2 justify-between">
        <span className="font-semibold">{formatTitleDate(date)}</span>

        <span className="flex gap-0 flex-col text-xs text-right font-semibold">
          <span className="text-red-500">{formatMoney(allExpense)}</span>
          <span className="text-green-500">{formatMoney(allIncome)}</span>
        </span>
      </span>

      <ul className=" gap-1 flex flex-col">
        {data.map((item) => (
          <ListTransItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
