"use client";
import { useQueryWallet } from "@/lib/api/app.query";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseInput } from "@/lib/components/wise/input/wise-input";
import { WiseIcon } from "@/lib/components/wise/wise-icon";
import {
  setupCategories,
  setupGlobalIcons,
  setupProfile,
  setupWallet,
} from "@/server-action";

export const PageProfile = () => {
  const { data: wallets = [] } = useQueryWallet();
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

      <WiseInput type="text" placeholder="Search" />
      <WiseInput
        type="select"
        options={wallets}
        className="w-40"
        renderItem={(item) => {
          return (
            <div className="flex items-center gap-2">
              <WiseIcon icon={item.icon} />
              <span>{item.name}</span>
            </div>
          );
        }}
      />

      {/* <WiseButton onClick={setupWallet}>Setup Wallet</WiseButton> */}
    </Page>
  );
};
