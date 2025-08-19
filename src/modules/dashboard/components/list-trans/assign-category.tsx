import { useMutateAssignCategory } from "@/lib/api/app.mutate";
import { useQueryCategory } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import type { ICategory, ITransaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Popover, PopoverClose, PopoverTrigger } from "@radix-ui/react-popover";

type Props = {
  idTransaction: string;
  category: ITransaction["category"];
};

export const AssignCategory = (props: Props) => {
  const { data = [] } = useQueryCategory();
  const { mutate: assignCategory } = useMutateAssignCategory();

  const title = props.category?.name || "No category";

  const listIncome = data?.filter((x) => x.type === "Income");
  const listExpense = data?.filter((x) => x.type === "Expense");

  const renderItem = (cate: ICategory) => {
    const { idTransaction } = props;
    const idCategory = cate.id;
    return (
      <PopoverClose
        asChild
        onClick={(e) => {
          e.stopPropagation();
          assignCategory({ idTransaction, idCategory });
        }}
      >
        <span className="flex gap-2 items-center text-xs font-medium cursor-pointer ">
          <IconPicker size="sm" disabled icon={cate.icon} />
          <span className="line-clamp-1 ">{cate.name}</span>
        </span>
      </PopoverClose>
    );
  };

  const renderList = (categories: ICategory[]) => {
    return (
      <div className="flex cursor-pointer flex-col h-full overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 divide-y ">
        {categories.map((cate) => {
          return (
            <span key={cate.id} className="flex flex-col gap-2">
              {renderItem(cate)}

              <span className=" w-[90%] self-end">
                {cate.children && renderList(cate.children as ICategory[])}
              </span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <Popover modal>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <WrapperAssignTrigger title={title}>
          <IconPicker icon={props.category?.icon} size="xs" disabled />
        </WrapperAssignTrigger>
      </PopoverTrigger>

      <WisePopoverContent className="grid h-72 grid-cols-2 gap-4 w-96 ">
        {renderList(listExpense)}
        {renderList(listIncome)}
      </WisePopoverContent>
    </Popover>
  );
};

export const WrapperAssignTrigger = (props: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <span
      className={cn(
        "flex items-center gap-1 cursor-pointer font-semibold",
        " gap-1",
        props.className
      )}
    >
      {props.children}
      <span className="line-clamp-1 truncate">{props.title}</span>
    </span>
  );
};
