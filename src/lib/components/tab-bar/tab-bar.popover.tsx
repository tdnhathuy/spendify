import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { BsThreeDotsVertical } from "react-icons/bs";

export const PopoverTabBar = () => {
  return (
    <Popover modal>
      <PopoverTrigger>
        <BsThreeDotsVertical />
      </PopoverTrigger>

      <WisePopoverContent>
        <span>Add Wallet</span>
      </WisePopoverContent>
    </Popover>
  );
};
