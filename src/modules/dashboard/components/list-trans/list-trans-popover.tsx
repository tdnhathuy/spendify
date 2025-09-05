import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useMutateDeleteTrans } from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { ITransaction } from "@/lib/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { ReactNode } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

interface Props {
  transaction: ITransaction;
}

export const PopoverListTrans = ({ transaction }: Props) => {
  const { mutateAsync: deleteTrans } = useMutateDeleteTrans(transaction.id);

  const onDelete = async () => {
    await deleteTrans(transaction.id);
  };

  const onTransfer = () => {
    dialogs.open("transfer", {
      isMarkTransfer: true,
      amount: transaction.amount + "",
      walletFrom: {
        id: transaction.wallet?.id || "",
        name: transaction.wallet?.name || "",
        currentBalance: transaction.wallet?.currentBalance + "",
        icon: transaction.wallet?.icon || null,
      },
      // walletFrom: transaction.wallet,
      // walletTo: transaction.wallet,
    });
  };

  const isCanMarkTransfer = !!transaction.infoSync;
  const isCanDelete = !transaction.transfer;
  console.log("isCanMarkTransfer", isCanMarkTransfer);

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

      <WisePopoverContent className="wf gap-2 space-y-1 w-40">
        <PopoverItem
          icon={<FaMoneyBillTransfer />}
          title="Transfer"
          onClick={onTransfer}
          visible={isCanMarkTransfer}
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
      <span className="text-xs font-semibold">{title}</span>
    </PopoverClose>
  );
};
