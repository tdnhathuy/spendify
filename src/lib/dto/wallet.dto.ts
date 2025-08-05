import { Icon, Wallet } from "@/generated/prisma";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { IWallet } from "@/lib/types";

const fromObject = (wallet: Wallet, icons: Icon[]): IWallet => {
  const icon = icons.find((x) => x.id === wallet.idIcon);

  return {
    id: wallet.id,
    icon: icon ? DTOIcon.fromIcon(icon) : null,
    name: wallet.name,
    initBalance: wallet.balance,
    type: wallet.type,
  };
};

const fromObjects = (wallets: Wallet[], icons: Icon[]): IWallet[] => {
  return wallets.map((wallet) => fromObject(wallet, icons));
};

export const DTOWallet = {
  fromObject,
  fromObjects,
};
