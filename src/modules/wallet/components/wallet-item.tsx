import { WalletType } from "@/generated/prisma";
import { openDialog } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { formatMoney } from "@/lib/helpers";
import { IWallet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WrapperWallet } from "@/modules/wallet/components";
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
  const onClick = () => {
    openDialog("wallet", props.wallet);
  };

  return (
    <WrapperWallet
      onClick={onClick}
      className={cn("bg-gradient-to-t shadow-md border-none cursor-pointer", {
        "from-green-400 to-green-500": props.wallet.type === "Cash",
        "from-blue-400 to-blue-500": props.wallet.type === "Debit",
        "from-violet-400 to-violet-500": props.wallet.type === "Credit",
        "from-orange-300 to-orange-400": props.wallet.type === "Crypto",
      })}
    >
      <div className="flex flex-1 p-4 gap-4 flex-col ">
        <span className="flex gap-2">
          <span className="flex  w-fit p-2 rounded-md bg-white/20">
            <IconPicker size="sm" icon={props.wallet.icon} disabled />
          </span>

          <span className="flex flex-1 flex-col  justify-center text-white ">
            <span className="text-base font-bold">{props.wallet.name}</span>
            <span className="text-xs ">{props.wallet.type}</span>
          </span>
          <span>{WalletIcon[props.wallet.type]({ color: "white" })}</span>
        </span>

        <span className="flex flex-col text-white">
          <span className="font-bold text-xl">
            {formatMoney(props.wallet.currentBalance)}
          </span>

          <span className="text-xs text-gray-700">Current Balance</span>
        </span>
      </div>

      {/* <div className="flex  gap-2 justify-around">
        <button className={btnTW}>
          <SquarePen size={14} />
          <span>Edit</span>
        </button>

        <button className={btnTW}>
          <ArrowRightLeft size={14} />
          <span>Transfer</span>
        </button>
      </div> */}
    </WrapperWallet>
  );
};
