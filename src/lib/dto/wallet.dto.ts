import { DTOIcon } from "@/lib/dto/icon.dto";
import { IWallet } from "@/lib/types";
import { DBWallet } from "@/server";

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

export const DTOWallet = {
  fromDB,
};
