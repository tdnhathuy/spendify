import { IconPicker } from "@/lib/components";
import { ContextTransactionItem } from "@/modules/dashboard/components/transaction-item/list-trans-item";
import { useContext } from "react";
import { BiTransferAlt } from "react-icons/bi";

export const ListTransItemIcon = () => {
  const { item } = useContext(ContextTransactionItem);

  const isTransfer = !!item.transfer;

  return (
    <span className="bg-gray-200 p-2 flex rounded-full h-10 w-10 justify-center items-center ">
      {isTransfer ? (
        <BiTransferAlt />
      ) : (
        <IconPicker icon={item.categoryParent?.icon} disabled size="sm" />
      )}
    </span>
  );
};
