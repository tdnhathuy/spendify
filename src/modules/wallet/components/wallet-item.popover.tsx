import { WisePopoverContent } from "@/lib/components";
import { PopoverItem } from "@/lib/components/shared/popover-item";
import { IWallet } from "@/lib/types";
import { usePopoverWalletItem } from "@/modules/wallet/components/wallet-item.popover.controller";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { BiEdit, BiSolidAdjustAlt } from "react-icons/bi";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { IoSwapHorizontal } from "react-icons/io5";

export type PopoverWalletItemProps = {
  wallet: IWallet;
};
export const PopoverWalletItem = (props: PopoverWalletItemProps) => {
  const { onClick, open, setOpen } = usePopoverWalletItem(props);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="hover:bg-white/80 transition-all hover:text-black rounded-sm p-px px-1 h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          <BsThreeDots size={16} />
        </span>
      </PopoverTrigger>

      <WisePopoverContent className="w-48">
        <PopoverItem title="Edit" icon={<BiEdit />} onClick={onClick("edit")} />

        <PopoverItem
          title="Transfer"
          icon={<IoSwapHorizontal />}
          onClick={onClick("transfer")}
        />

        <PopoverItem
          title="Adjust"
          icon={<BiSolidAdjustAlt />}
          onClick={onClick("adjust")}
        />
      </WisePopoverContent>
    </Popover>
  );
};
