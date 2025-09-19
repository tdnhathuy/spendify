"use client";

import { getWallets } from "@/actions/wallet.actions";
import { WiseButton } from "@/lib/components";

async function getWalletInfo() {
  const wallets = await getWallets();
  console.log("wallets", wallets);
  return;
}

export const UpdateTransactionButton = () => {
  return (
    <>
      <form action={getWalletInfo}>
        <WiseButton type="submit">Get Wallet Info</WiseButton>
      </form>
    </>
  );
};
