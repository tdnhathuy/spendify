import { Icon, Wallet } from "@/generated/prisma";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { RawWallet } from "@/lib/server";
import { IWallet } from "@/lib/types";

const fromObject = (wallet: Wallet, icons: Icon[]): IWallet => {
  const icon = icons.find((x) => x.id === wallet.idIcon);

  return {
    id: wallet.id,
    icon: icon ? DTOIcon.fromIcon(icon) : null,
    name: wallet.name,
    initBalance: wallet.initBalance,
    type: wallet.type,
  };
};

const fromObjects = (wallets: Wallet[], icons: Icon[]): IWallet[] => {
  return wallets.map((wallet) => fromObject(wallet, icons));
};

export const DTOWallet = {
  fromRawWallet: (wallet: RawWallet): IWallet | null => {
    if (!wallet) return null;
    return {
      id: wallet.id,
      name: wallet.name,
      icon: DTOIcon.fromObject(wallet.icon),
      type: wallet.type,
      initBalance: wallet.initBalance,
    };
  },
  fromObject,
  fromObjects,
};
