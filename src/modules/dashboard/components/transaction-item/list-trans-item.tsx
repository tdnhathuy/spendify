// Re-export the compound component from compounds folder

import { Skeleton } from "@/components/ui/skeleton";
import { range } from "lodash";
import * as TransactionItem from "./compounds";
import { cn } from "@/lib/utils";
import { useTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item.hook";

interface TransactionListItemProps {}

export const TransactionListItem = (props: TransactionListItemProps) => {
  const { isTransfer } = useTransactionItem();
  return (
    <TransactionItem.Wrapper>
      <div className="flex items-center gap-3">
        <div>
          <TransactionItem.Icon />
        </div>
        <span className="flex flex-col gap-0 flex-1">
          <Wrapper>
            <TransactionItem.Title />
            <TransactionItem.Amount />
          </Wrapper>

          <TransactionItem.Desc />
        </span>
      </div>

      <Wrapper>
        <div className={cn("flex gap-2", isTransfer && "invisible")}>
          <TransactionItem.TagCategory />
          <TransactionItem.TagWallet />
        </div>
        <div className="flex items-center gap-2">
          <TransactionItem.TagSplit />
          <TransactionItem.PopoverListTrans />
        </div>
      </Wrapper>
    </TransactionItem.Wrapper>
  );
};

export const SkeletonTransactionListItem = () => {
  return range(3).map((item) => (
    <TransactionItem.Wrapper key={item} isSkeleton={true} className="">
      <div className="flex items-center gap-4 flex-1">
        <Skeleton className="rounded-full size-12" />

        <div className="flex  flex-1 flex-col gap-2 ">
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>

        <Skeleton className="h-6 rounded-full w-[20%] self-start" />
      </div>
    </TransactionItem.Wrapper>
  ));
};

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-between w-full", className)}>
      {children}
    </div>
  );
};
