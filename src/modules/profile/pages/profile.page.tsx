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
      <WiseButton
        onClick={() => {
          console.log("setupGlobalIcons");
          setupGlobalIcons();
        }}
      >
        Setup icons
      </WiseButton>
      <WiseButton
        onClick={() => {
          console.log("setupCategories");
          setupCategories();
        }}
      >
        Setup categories
      </WiseButton>
      <WiseButton
        onClick={() => {
          console.log("setupWallet");
          setupWallet();
        }}
      >
        Setup wallet
      </WiseButton>
      <WiseButton
        disabled
        onClick={() => {
          console.log("setupProfile");
          setupProfile();
        }}
      >
        Setup profile
      </WiseButton>

      {/* <WiseButton onClick={setupWallet}>Setup Wallet</WiseButton> */}
    </Page>
  );
};
