"use client";

import { WrapperWallet } from "@/modules/wallet/components/wrapper-wallet";
import { Plus } from "lucide-react";

export const PageWallet = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <h1>Wallet2</h1>

      <div className="grid grid-cols-5 gap-2  w-full">
        <WrapperWallet
          className="flex justify-center items-center"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <span className="text-center gap-2 flex items-center justify-center flex-col text-sm ">
            <Plus />
            <span>Add Wallet</span>
          </span>
        </WrapperWallet>
      </div>
    </div>
  );
};
