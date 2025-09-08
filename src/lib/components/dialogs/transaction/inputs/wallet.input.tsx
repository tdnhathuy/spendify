"use client";

import { PopoverClose } from "@radix-ui/react-popover";
import type { ControllerRenderProps } from "react-hook-form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Cache } from "@/lib/api/app.cache";
import { useQueryWallet } from "@/lib/api/app.query";
import { InputOption } from "@/lib/components/dialogs/transaction/inputs/misc";
import type { TypeSchemaTransaction } from "@/lib/components/dialogs/transaction/schema";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { LabelBlock } from "@/lib/components/shared/label-block";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import type { IWallet } from "@/lib/types";

export const InputWallet = (
  props: ControllerRenderProps<TypeSchemaTransaction, "wallet">
) => {
  const { value, onChange } = props;
  const { data = [] } = useQueryWallet();

  const onSelect = (wallet: IWallet) => {
    onChange({ id: wallet.id, label: wallet.name });
  };

  const iconWallet = Cache.getWallet().find((x) => x.id === value?.id)?.icon;

  return (
    <div className="flex flex-1">
      <Popover modal>
        <PopoverTrigger
          asChild
          className="flex flex-1 cursor-pointer items-center gap-2 w-full"
        >
          <LabelBlock label="Wallet">
            <InputOption icon={iconWallet ?? null} label={value?.label || ""} />
          </LabelBlock>
        </PopoverTrigger>

        <WisePopoverContent className="flex flex-col">
          {data.map((wallet) => {
            return (
              <PopoverClose
                asChild
                key={wallet.id}
                onClick={() => onSelect(wallet)}
              >
                <span className="flex items-center gap-2 p-2 py-3 cursor-pointer hover:bg-gray-200 rounded-sm">
                  <IconPicker icon={wallet.icon} size="sm" disabled />
                  <span>{wallet.name}</span>
                </span>
              </PopoverClose>
            );
          })}
        </WisePopoverContent>
      </Popover>
    </div>
  );
};
