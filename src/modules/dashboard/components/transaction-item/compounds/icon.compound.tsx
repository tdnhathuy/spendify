import { IconPicker } from "@/lib/components";
import { BiTransferAlt } from "react-icons/bi";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { useTransactionItem } from "../list-trans-item.hook";

export const Icon = () => {
  const { isTransfer, categoryIcon, isAdjust } = useTransactionItem();

  const renderIcon = () => {
    if (isTransfer) return <BiTransferAlt />;
    if (isAdjust) return <FaScaleUnbalanced />;
    return <IconPicker icon={categoryIcon} disabled size="sm" />;
  };

  return (
    <span className="bg-gray-200 p-2 flex rounded-full h-10 w-10 justify-center items-center ">
      {renderIcon()}
    </span>
  );
};
