import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dialogs } from "@/lib/components";
import { PopoverItem } from "@/lib/components/shared/popover-item";
import { useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAddTask } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

export const PopoverListCategoryItem = () => {
  const [open, setOpen] = useState(false);

  const onClick = (type: "add" | "detail") => () => {
    setOpen(false);

    if (type === "add") return onAdd();
    if (type === "detail") return onDelete();
  };

  const onDelete = () => {
    console.log("delete");
  };

  const onAdd = () => {
    dialogs.open("create-category");
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="hover:bg-gray-200 rounded-sm p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          <BsThreeDotsVertical size={16} />
        </span>
      </PopoverTrigger>

      <PopoverContent
        onClick={(e) => e.stopPropagation()}
        className="p-1 gap-1 flex flex-col w-48"
      >
        <PopoverItem
          icon={<MdAddTask />}
          title={"Add child"}
          onClick={onClick("add")}
        />
        <PopoverItem
          icon={<BiMessageSquareEdit />}
          title={"Update"}
          onClick={onClick("detail")}
        />
        <PopoverItem
          icon={<RiDeleteBin2Fill />}
          title={"Remove"}
          onClick={onClick("detail")}
        />
      </PopoverContent>
    </Popover>
  );
};
