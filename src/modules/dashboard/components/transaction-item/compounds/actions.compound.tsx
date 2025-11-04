import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { FormAction } from "@/lib/types";
import { ReactNode } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { usePopoverListTrans } from "./actions.controller";

export const PopoverListTrans = () => {
  const { status, onClick, open, setOpen } = usePopoverListTrans();

  const {
    isCanMarkTransfer,
    isCanDelete,
    isCanUnmarkTransfer,
    isCanSplit,
    //
  } = status;

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger
        className="p-px px-1 rounded-xs cursor-pointer transition-all hover:bg-white/80 hover:text-black"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <BsThreeDots size={16} />
      </PopoverTrigger>

      <WisePopoverContent className="wf gap-2 space-y-1 w-fit">
        <PopoverItem
          icon={<FaMoneyBillTransfer />}
          title="Mark Transfer"
          onClick={onClick("transfer")}
          visible={true}
        />

        <PopoverItem
          icon={<FaMoneyBillTransfer />}
          title="Split"
          onClick={onClick("split")}
          visible={isCanSplit}
        />

        <PopoverItem
          icon={<FaMoneyBillTransfer />}
          title={"Make need split"}
          onClick={onClick("mark-split")}
        />

        <PopoverItem
          icon={<MdDelete />}
          title="Delete"
          visible={isCanDelete}
          onClick={onClick("delete")}
        />
      </WisePopoverContent>
    </Popover>
  );
};

interface PopoverItemProps {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  visible?: boolean;
  formAction?: FormAction;
}

const PopoverItem = (props: PopoverItemProps) => {
  const { icon, title, onClick, visible = true, formAction } = props;

  if (!visible) return null;

  return (
    <button
      className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-200 p-2 rounded-xs"
      onClick={onClick}
    >
      <span className="w-6 flex justify-center items-center">{icon}</span>
      <span className="text-xs line-clamp-1 text-left font-semibold">
        {title}
      </span>
    </button>
  );
};
