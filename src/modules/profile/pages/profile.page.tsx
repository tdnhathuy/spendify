"use client";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { setupProfile, setupWallet } from "@/server-action";

export const PageProfile = () => {
  return (
    <Page title={"Profile"}>
      <WiseButton disabled onClick={setupProfile}>
        Setup profile 2
      </WiseButton>

      <WiseButton onClick={setupWallet}>Setup Wallet</WiseButton>
    </Page>
  );
};
