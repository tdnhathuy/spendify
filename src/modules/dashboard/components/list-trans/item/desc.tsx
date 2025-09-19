import { ContextTransItem } from "@/modules/dashboard/components/list-trans/item/list-trans-item";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { use } from "react";

export const ListTransItemDesc = () => {
  const { item } = use(ContextTransItem);

  return (
    <span className="text-xs flex items-center gap-1 text-gray-500 line-clamp-2 ">
      <HiOutlinePencilSquare />
      {item.description || "..."}
    </span>
  );
};
