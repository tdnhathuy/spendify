import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useTransactionItem } from "../list-trans-item.hook";

export const Desc = () => {
  const { description } = useTransactionItem();

  return (
    <span
      className="text-xs text-gray-500"
      onClick={(e) => e.stopPropagation()}
    >
      {description && (
        <span className="block h-[2lh] overflow-hidden line-clamp-2 space-x-1">
          <HiOutlinePencilSquare className="inline" size={14} />
          <span>{description}</span>
        </span>
      )}
    </span>
  );
};
