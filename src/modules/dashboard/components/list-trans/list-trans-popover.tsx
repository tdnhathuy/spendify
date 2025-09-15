import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { ITransaction } from "@/lib/types";
import { usePopoverListTrans } from "@/modules/dashboard/components/list-trans/list-trans-popover.action";
import { PopoverClose } from "@radix-ui/react-popover";
import { ReactNode } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export interface PopoverListTransProps {
  transaction: ITransaction;
}

export const PopoverListTrans = (props: PopoverListTransProps) => {
  const { actions, status } = usePopoverListTrans(props);
  const {
    //
    onDelete,
    onTransfer,
    onUnmarkTransfer,
    onSplit,
  } = actions;

  const {
    isCanMarkTransfer,
    isCanDelete,
    isCanUnmarkTransfer,
    isCanSplit,
    //
  } = status;

  return (
    <Popover>
      <PopoverTrigger
        className=" py-1 px-0 cursor-pointer rounded-sm hover:bg-gray-300"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <BsThreeDotsVertical size={16} />
      </PopoverTrigger>

      <WisePopoverContent className="wf gap-2 space-y-1 w-fit">
        <PopoverItem
          icon={<FaMoneyBillTransfer />}
          title="Mark Transfer"
          onClick={onTransfer}
          visible={isCanMarkTransfer && !isCanUnmarkTransfer}
        />

        <PopoverItem
          icon={<FaMoneyBillTransfer />}
          title="Split"
          onClick={onSplit}
          visible={isCanSplit}
        />

        <PopoverItem
          icon={<FaMoneyBillTransfer />}
          title="Unmark Transfer"
          onClick={onUnmarkTransfer}
          visible={isCanUnmarkTransfer}
        />

        <PopoverItem
          icon={<MdDelete />}
          title="Delete"
          onClick={onDelete}
          visible={isCanDelete}
        />
      </WisePopoverContent>
    </Popover>
  );
};

interface PopoverItemProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  visible?: boolean;
}

const PopoverItem = (props: PopoverItemProps) => {
  const { icon, title, onClick, visible = true } = props;

  if (!visible) return null;

  return (
    <PopoverClose
      className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-200 p-2 rounded-xs"
      onClick={onClick}
    >
      <span className="w-6 flex justify-center items-center">{icon}</span>
      <span className="text-xs line-clamp-1 text-left font-semibold">
        {title}
      </span>
    </PopoverClose>
  );
};
