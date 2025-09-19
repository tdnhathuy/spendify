import { ITransaction } from "@/lib/types";
import { ListTransItem } from "@/modules/dashboard/components/list-trans/item/list-trans-item";
import { HeaderListTrans } from "@/modules/dashboard/components/list-trans/list-trans-header";

export interface ListTransGroupProps {
  data: ITransaction[];
  date: string;
}

export const ListTransGroup = (props: ListTransGroupProps) => {
  const { data = [] } = props;

  return (
    <div className="w-full">
      <HeaderListTrans {...props} />

      <ul className=" gap-1 flex flex-col">
        {data.map((item) => (
          <ListTransItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
