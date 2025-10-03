"use server";
import { WiseButton } from "@/lib/components";
import { getWallets } from "@/server-action";

export const UpdateTransactionButton = () => {
  async function getWalletInfo() {
    "use server";
    const wallets = await getWallets();
    console.log("wallets", wallets);

    return;
  }
  return <WiseButton onClick={getWalletInfo}>Import Flat icon</WiseButton>;
};
