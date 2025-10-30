"use client";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import {
  setupCategories,
  setupGlobalIcons,
  setupProfile,
  setupWallet,
} from "@/server-action";

export const PageProfile = () => {
  return (
    <Page title={"Profile"}>
      <WiseButton onClick={() => setupGlobalIcons()}>Setup icons</WiseButton>
      <WiseButton onClick={() => setupCategories()}>
        Setup categories
      </WiseButton>
      <WiseButton onClick={() => setupWallet()}>Setup wallet</WiseButton>
      <WiseButton disabled onClick={() => setupProfile()}>
        Setup profile
      </WiseButton>

      {/* <WiseButton onClick={setupWallet}>Setup Wallet</WiseButton> */}
    </Page>
  );
};
