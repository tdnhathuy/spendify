import { useQueryCategory } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { useMutateAssignCategory } from "@/lib/api/app.mutate";
import { Category, Transaction } from "@/lib/types";
import { Popover, PopoverClose, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

type Props = {
  idTransaction: string;
  category: Transaction["category"];
};

export const baseStyleTW = cn(
  "w-fit cursor-pointer flex font-semibold text-xs px-2 rounded-xs py-px items-center gap-2",
  "hover:bg-gray-300"
);

export const AssignCategory = (props: Props) => {
  const { data = [] } = useQueryCategory();
  const { mutate: assignCategory } = useMutateAssignCategory();

  const title = props.category?.name || "No category";

  const listIncome = data?.filter((x) => x.type === "Income");
  const listExpense = data?.filter((x) => x.type === "Expense");

  const renderItem = (cate: Category) => {
    const { idTransaction } = props;
    const idCategory = cate.id;
    return (
      <PopoverClose asChild>
        <span
          className="flex gap-2 items-center text-xs font-medium cursor-pointer"
          onClick={() => assignCategory({ idTransaction, idCategory })}
        >
          <IconPicker size="sm" disabled icon={cate.icon} />
          <span>{cate.name}</span>
        </span>
      </PopoverClose>
    );
  };

  const renderList = (categories: Category[]) => {
    return (
      <div className="flex cursor-pointer flex-col h-full overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 divide-y ">
        {categories.map((cate) => {
          return (
            <span key={cate.id} className="flex flex-col gap-2">
              {renderItem(cate)}

              <span className=" w-[90%] self-end">
                {cate.children && renderList(cate.children as Category[])}
              </span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <Popover modal>
      <PopoverTrigger className={baseStyleTW}>
        <IconPicker icon={props.category?.icon} size="xs" disabled />
        <span>{title}</span>
      </PopoverTrigger>

      <WisePopoverContent className="grid h-72 grid-cols-2 gap-4 w-96 ">
        {renderList(listExpense)}
        {renderList(listIncome)}
      </WisePopoverContent>
    </Popover>
  );
};
