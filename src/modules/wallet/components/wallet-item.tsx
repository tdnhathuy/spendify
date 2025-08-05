import { IconPicker } from "@/lib/components/shared/icon-picker";
import { IWallet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WrapperWallet } from "@/modules/wallet/components";
import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";
import { ArrowRightLeft, SquarePen } from "lucide-react";

interface Props {
  wallet: IWallet;
}

const btnTW = cn(
  "px-4 py-1 my-1 rounded-sm text-sm cursor-pointer flex items-center gap-2 ",
  "hover:bg-gray-100"
);

export const WalletItem = (props: Props) => {
  const actions = useStoreDialogWallet((s) => s.actions);

  const onClick = () => {
    actions.setOpen(true, props.wallet);
  };

  return (
    <WrapperWallet onClick={onClick}>
      <div className="flex flex-1 p-4 gap-2 flex-col border-b">
        <span className="flex items-center gap-2">
          <IconPicker size="sm" icon={props.wallet.icon} disabled />
          <span className="text-sm font-bold">{props.wallet.name}</span>
        </span>

        <span className="flex flex-col">
          <span>Current Balance</span>
          <span className="text-sm font-bold">{props.wallet.initBalance}</span>
        </span>
      </div>

      <div className="flex  gap-2 justify-around">
        <button className={btnTW}>
          <SquarePen size={14} />
          <span>Edit</span>
        </button>

        <button className={btnTW}>
          <ArrowRightLeft size={14} />
          <span>Transfer</span>
        </button>
      </div>
    </WrapperWallet>
  );
};
