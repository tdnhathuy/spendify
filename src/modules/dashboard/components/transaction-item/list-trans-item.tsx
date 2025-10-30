// Re-export the compound component from compounds folder

import { Skeleton } from "@/components/ui/skeleton";
import * as TransactionItem from "./compounds";
import { range } from "lodash";

interface TransactionListItemProps {}

export const TransactionListItem = (props: TransactionListItemProps) => {
  return (
    <TransactionItem.Wrapper>
      <TransactionItem.Icon />

      <div className="flex flex-1 items-start flex-col gap-2">
        <Wrapper>
          <TransactionItem.Title />
          <TransactionItem.Amount />
        </Wrapper>

        <Wrapper>
          <TransactionItem.Desc />
          <TransactionItem.PopoverListTrans />
        </Wrapper>

        <Wrapper>
          <TransactionItem.Date />
          <TransactionItem.TagSplit />
        </Wrapper>
      </div>
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

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between w-full">{children}</div>;
};
