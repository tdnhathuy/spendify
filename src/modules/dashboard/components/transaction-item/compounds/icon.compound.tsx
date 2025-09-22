import { IconPicker } from "@/lib/components";
import { ContextTransactionItem } from "./root";
import { useContext } from "react";
import { BiTransferAlt } from "react-icons/bi";

export const ListTransItemIcon = () => {
  const { transaction } = useContext(ContextTransactionItem);

  const isTransfer = !!transaction.transfer;

  return (
    <span className="bg-gray-200 p-2 flex rounded-full h-10 w-10 justify-center items-center ">
      {isTransfer ? (
        <BiTransferAlt />
      ) : (
        <IconPicker
          icon={transaction.categoryParent?.icon}
          disabled
          size="sm"
        />
      )}
    </span>
  );
};
