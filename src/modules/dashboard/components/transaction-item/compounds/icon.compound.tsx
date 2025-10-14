import { IconPicker } from "@/lib/components";
import { BiSync, BiTransferAlt } from "react-icons/bi";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { useTransactionItem } from "../list-trans-item.hook";

export const Icon = () => {
  const { isTransfer, categoryIcon, isAdjust, isSync } = useTransactionItem();

  const renderIcon = () => {
    if (isTransfer) return <BiTransferAlt />;
    if (isAdjust) return <FaScaleUnbalanced />;
    return <IconPicker icon={categoryIcon} disabled size="sm" />;
  };

  return (
    <span className="bg-gray-200 p-2 flex rounded-full h-10 w-10 justify-center items-center relative ">
      {renderIcon()}

      {isSync && (
        <span className="absolute -top-[5px] -right-[5px] rounded-full border-border  bg-white   z-10  flex justify-center items-center">
          <BiSync className="text-blue-500 " size={20} />
        </span>
      )}
    </span>
  );
};
