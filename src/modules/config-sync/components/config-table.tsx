"use client";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useQueryWallet } from "@/lib/api/app.query";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { client } from "@/lib/configs";
import { IWallet } from "@/lib/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";

export const ConfigTable = () => {
  const { data: wallets } = useQueryWallet();

  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [email, setEmail] = useState<string>("");
  return (
    <div>
      <div className="flex items-center gap-2">
        <WiseTextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Popover>
          <PopoverTrigger>{wallet?.name || "123"}</PopoverTrigger>

          <WisePopoverContent className="flex flex-col">
            {wallets?.map((wallet) => (
              <PopoverClose
                key={wallet.id}
                onClick={() => setWallet(wallet)}
                className="flex w-full"
              >
                {wallet.name}
              </PopoverClose>
            ))}
          </WisePopoverContent>
        </Popover>
      </div>
      <WiseButton
        onClick={() => {
          client.post("config-sync", {
            body: JSON.stringify({
              walletId: wallet?.id,
              email,
            }),
          });
        }}
      >
        Mapping
      </WiseButton>
    </div>
  );
};
