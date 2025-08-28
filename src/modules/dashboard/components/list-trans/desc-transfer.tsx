import { IconPicker } from "@/lib/components";
import { ITransaction, IWalletSimple } from "@/lib/types";
import { FcAdvance } from "react-icons/fc";

interface DescTransferProps {
  transaction: ITransaction;
}

export const DescTransfer = ({ transaction }: DescTransferProps) => {
  const { transfer } = transaction;
  if (!transfer) return null;

  return (
    <span className="flex gap-2">
      <Wallet wallet={transfer.fromWallet} />
      <FcAdvance />
      <Wallet wallet={transfer.toWallet} />
    </span>
  );
};

const Wallet = ({ wallet }: { wallet: IWalletSimple | undefined }) => {
  if (!wallet) return null;

  return (
    <span className="flex items-center gap-1">
      <IconPicker icon={wallet.icon} disabled size="xs" />
      <span className="text-xs">{wallet.name}</span>
    </span>
  );
};
