import { DTOIcon } from "@/lib/dto/icon.dto";
import { IconClass, WalletClass } from "@/lib/model";
import { Wallet } from "@/lib/types";

export const DTOWallet = {
  fromClass: (wallet: WalletClass, icons: IconClass[] = []): Wallet => {
    const icon = icons.find(
      (x) => x._id?.toString() === wallet.idIcon.toString()
    );
    return {
      id: wallet._id.toString(),
      initBalance: wallet.initBalance,
      name: wallet.name,
      icon: icon ? DTOIcon.fromIcon(icon) : null,
      type: wallet.type,
    };
  },
};
