import { PopoverItem } from "@/lib/components/shared/popover-item";
import { toggleNeedSplit } from "@/lib/actions/transaction.actions";
import { FaMoneyBillTransfer } from "react-icons/fa6";

interface ButtonNeedSplitProps {
  transactionId: string;
}

export const ButtonNeedSplit = ({ transactionId }: ButtonNeedSplitProps) => {
  const boundAction = toggleNeedSplit.bind(null, transactionId);

  return (
    <form action={boundAction}>
      <PopoverItem icon={<FaMoneyBillTransfer />} title="Split 2" />
    </form>
  );
};
