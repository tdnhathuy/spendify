import { ITransaction } from "@/lib/types";
import { TransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { HeaderListTrans } from "@/modules/dashboard/components/transaction-list/list-trans-header";

export interface ListTransGroupProps {
  data: ITransaction[];
  date: string;
}

export const ListTransGroup = (props: ListTransGroupProps) => {
  const { data = [] } = props;

  return (
    <div className="w-full">
      <HeaderListTrans {...props} />

      <ul className="gap-1 flex flex-col">
        {data.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};
