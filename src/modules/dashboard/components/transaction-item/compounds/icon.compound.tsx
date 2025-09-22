import { IconPicker } from "@/lib/components";
import { useTransactionItem } from "../list-trans-item.hook";
import { BiTransferAlt } from "react-icons/bi";

export const Icon = () => {
  const { isTransfer, categoryIcon } = useTransactionItem();

  return (
    <span className="bg-gray-200 p-2 flex rounded-full h-10 w-10 justify-center items-center ">
      {isTransfer ? (
        <BiTransferAlt />
      ) : (
        <IconPicker icon={categoryIcon} disabled size="sm" />
      )}
    </span>
  );
};
