import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { dialogs } from "@/lib/components/dialogs";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { BsThreeDotsVertical } from "react-icons/bs";

export const PopoverTabBar = () => {
  return (
    <Popover modal>
      <PopoverTrigger>
        <BsThreeDotsVertical />
      </PopoverTrigger>

      <WisePopoverContent>
        <WiseButton
          onClick={() => {
            dialogs.open("trans");
          }}
          className="w-full"
        >
          Create Trans
        </WiseButton>
      </WisePopoverContent>
    </Popover>
  );
};
