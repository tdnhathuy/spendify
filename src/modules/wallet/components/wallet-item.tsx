import { WalletType } from "@/generated/prisma";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { formatMoney } from "@/lib/helpers";
import { IWallet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WrapperWallet } from "@/modules/wallet/components";
import { PopoverWalletItem } from "@/modules/wallet/components/wallet-item.popover";
import { BiWallet } from "react-icons/bi";
import { BsCreditCard } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";

interface Props {
  wallet: IWallet;
}

export const WalletIcon: Record<
  WalletType,
  (props: { color: string }) => React.ReactNode
> = {
  Cash: (props) => <BiWallet color={props.color} size={22} />,
  Debit: (props) => <BsCreditCard color={props.color} size={22} />,
  Credit: (props) => <FaCcVisa color={props.color} size={22} />,
  Crypto: (props) => <FaBitcoin color={props.color} size={22} />,
};

export const WalletItem = (props: Props) => {
  const { wallet } = props;

  return (
    <WrapperWallet
      onClick={() => sheets.open("wallet-detail", wallet)}
      className={cn(
        "border-border transition-all bg-foreground hover:bg-focus rounded-sm cursor-pointer",
        {
          // "from-green-400 to-green-500": wallet.type === "Cash",
          // "from-blue-400 to-blue-500": wallet.type === "Debit",
          // "from-violet-400 to-violet-500": wallet.type === "Credit",
          // "from-orange-300 to-orange-400": wallet.type === "Crypto",
        }
      )}
    >
      <div className="flex flex-1 p-4 gap-4 flex-col ">
        <span className="flex flex-col text-white">
          <span className="flex gap-2 justify-between items-center">
            <span className="text-xs text-white/50">Current Balance</span>
            <PopoverWalletItem wallet={wallet} />
          </span>

          <span className="font-bold text-xl">
            {formatMoney(wallet.currentBalance)}
          </span>
        </span>

        <span className="flex gap-2">
          <span className="flex h-fit w-fit p-1 rounded-sm bg-focus">
            <IconPicker className="size-4" icon={wallet.icon} disabled />
          </span>

          <span className="flex flex-1 flex-col  justify-center text-white ">
            <span className="text-base font-bold">{wallet.name}</span>
          </span>
        </span>
      </div>
    </WrapperWallet>
  );
};
