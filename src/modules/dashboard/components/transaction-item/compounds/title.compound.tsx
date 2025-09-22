import { IconPicker } from "@/lib/components";
import { useTransactionItem } from "../list-trans-item.hook";
import { BiTransferAlt } from "react-icons/bi";

export const Title = () => {
  const { isTransfer, categoryName } = useTransactionItem();

  const title = isTransfer ? "Transfer" : categoryName;

  if (!title) return null;

  return <h1 className="font-semibold text-sm">{title}</h1>;
};

export const TileTransfer = () => {
  const { isTransfer, transaction } = useTransactionItem();
  const { walletFrom, walletTo } = transaction.transfer || {};

  if (!isTransfer) return null;

  return (
    <span className="font-semibold text-sm  items-center gap-2 flex">
      <span>Transfer</span>

      <WrapperIcon>
        <IconPicker className="size-5" icon={walletFrom?.icon} disabled />
      </WrapperIcon>

      <BiTransferAlt />

      <WrapperIcon>
        <IconPicker className="size-5" icon={walletTo?.icon} disabled />
      </WrapperIcon>
    </span>
  );
};

const WrapperIcon = ({ children }: { children: React.ReactNode }) => {
  return <span className="bg-gray-200 flex p-1 rounded-sm">{children}</span>;
};
