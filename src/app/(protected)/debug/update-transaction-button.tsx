"use server";
import { getWallets } from "@/lib/actions/wallet.actions";
import { WiseButton } from "@/lib/components";

export const UpdateTransactionButton = () => {
  async function getWalletInfo() {
    "use server";
    const wallets = await getWallets();
    console.log("wallets", wallets);

    return;
  }
  return <WiseButton onClick={getWalletInfo}>Import Flat icon</WiseButton>;
};
