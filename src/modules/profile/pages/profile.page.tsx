"use client";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { setupGlobalIcons, setupProfile } from "@/server-action";

export const PageProfile = () => {
  return (
    <Page title={"Profile"}>
      <WiseButton onClick={setupGlobalIcons}>Setup icons</WiseButton>

      <WiseButton onClick={setupProfile}>Setup profile</WiseButton>

      {/* <WiseButton onClick={setupWallet}>Setup Wallet</WiseButton> */}
    </Page>
  );
};
