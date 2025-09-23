import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { DBUser } from "@/server";
import { UserProfile } from "@/lib/types";

export const DTOUser = {
  fromObject: (obj: DBUser): UserProfile => {
    const wallets = obj.wallets
      .map(DTOWallet.fromDB)
      .filter((wallet) => wallet !== null);

    const categories = obj.categories
      .map(DTOCategory.fromDB)
      .filter((category) => category !== null);

    return {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      wallets,
      icons: [],
      categories,
    };
  },
};
