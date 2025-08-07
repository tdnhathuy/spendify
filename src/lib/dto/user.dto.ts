import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOIcon } from "@/lib/dto/icon.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { DBUser } from "@/lib/server";
import { UserProfile } from "@/lib/types";

export const DTOUser = {
  fromObject: (obj: DBUser): UserProfile => {
    const wallets = obj.wallets
      .map(DTOWallet.fromDB)
      .filter((wallet) => wallet !== null);

    const categories = obj.categories
      .map(DTOCategory.fromDB)
      .filter((category) => category !== null);

    const icons = obj.icons.map(DTOIcon.fromDB).filter((icon) => icon !== null);

    return {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      wallets,
      icons,
      categories,
    };
  },
};
