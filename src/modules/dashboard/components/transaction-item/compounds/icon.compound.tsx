import { WiseIcon } from "@/lib/components/wise/wise-icon";
import { BiSync, BiTransferAlt } from "react-icons/bi";
import { FaScaleUnbalanced } from "react-icons/fa6";
import { useTransactionItem } from "../list-trans-item.hook";
import { convertIdFlatIcon } from "@/lib/helpers";
import Image from "next/image";

export const Icon = () => {
  const { isTransfer, categoryIcon, isAdjust, isSync, isInitTransaction } =
    useTransactionItem();

  const renderIcon = () => {
    if (isInitTransaction) {
      const url = convertIdFlatIcon("3558987");
      return (
        <Image
          src={url}
          alt="init-transaction"
          width={50}
          height={50}
          className="w-full h-full object-cover"
          draggable={false}
          unoptimized
        />
      );
    }
    if (isTransfer) return <BiTransferAlt />;
    if (isAdjust) return <FaScaleUnbalanced />;
    return <WiseIcon icon={categoryIcon} size="lg" />;
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
