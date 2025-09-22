import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useTransactionItem } from "../list-trans-item.hook";

export const Desc = () => {
  const { description } = useTransactionItem();

  return (
    <span
      className="text-xs flex text-gray-500 line-clamp-2 flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {description && (
        <span className="flex items-center gap-1">
          <HiOutlinePencilSquare />
          <span className="line-clamp-1">{description}</span>
        </span>
      )}
    </span>
  );
};
