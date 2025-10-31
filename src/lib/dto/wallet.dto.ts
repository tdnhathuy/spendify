import { DTOIcon } from "@/lib/dto/icon.dto";
import { IWallet, IWalletSimple } from "@/lib/types";
import { DBWallet, DBWalletSimple } from "@/server";

const fromDB = (wallet: DBWallet | null): IWallet | null => {
  if (!wallet) return null;

  return {
    id: wallet.id,
    name: wallet.name,
    type: wallet.type,
    icon: wallet.icon && DTOIcon.fromDB(wallet.icon),
    currentBalance: 0,
    initBalance: 0,
    includeInReport: wallet.includeInTotal,
  };
};

const fromDBSimple = (wallet: DBWalletSimple | null): IWalletSimple | null => {
  if (!wallet) return null;

  return {
    id: wallet.id,
    name: wallet.name,
    icon: wallet.icon && DTOIcon.fromDB(wallet.icon),
  };
};
export const DTOWallet = {
  fromDB,
  fromDBSimple,
};
