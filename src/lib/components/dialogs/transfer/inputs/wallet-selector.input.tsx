"use client";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TypeSchemaTransfer } from "@/lib/components/dialogs/transfer/schema";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { formatMoney } from "@/lib/helpers";
import { IWallet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  listWallets: IWallet[];
  schemaKey: keyof Pick<TypeSchemaTransfer, "walletFrom" | "walletTo">;
  disabled?: boolean;
}

export const InputWalletSelector = (props: Props) => {
  const { listWallets = [], schemaKey, disabled = false } = props;
  const [open, setOpen] = useState(false);

  const form = useFormContext<TypeSchemaTransfer>();

  const onSelect = (wallet: IWallet) => {
    form.setValue(schemaKey, {
      name: wallet.name,
      id: wallet.id,
      currentBalance: wallet.currentBalance.toString(),
      icon: wallet.icon,
    });
    setOpen(false);
  };

  const { name, icon, currentBalance } = form.getValues(schemaKey) || {};

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          "flex cursor-pointer flex-1 border rounded-sm px-4 h-10 items-center gap-2",
          { "opacity-60": disabled }
        )}
      >
        {icon && <IconPicker icon={icon} disabled size="sm" />}

        <span className="flex flex-1 text-sm font-semibold">
          {name ?? "Select a wallet"}
        </span>

        <span className="text-xs text-muted-foreground">
          {currentBalance ? formatMoney(Number(currentBalance)) : ""}
        </span>
      </PopoverTrigger>

      <WisePopoverContent className="flex flex-col gap-2 w-[150%] ">
        {listWallets.map((wallet) => (
          <WiseButton
            variant={"outline"}
            key={wallet.id}
            onClick={() => onSelect(wallet)}
            className=" justify-start gap-4"
          >
            <span className="flex gap-2 ">
              <IconPicker icon={wallet.icon} disabled size="sm" />
            </span>
            <span className="flex flex-1 text-left flex-col gap-0 ">
              {wallet.name}
            </span>

            <span className="text-xs text-muted-foreground">
              {formatMoney(wallet.currentBalance)}
            </span>
          </WiseButton>
        ))}
      </WisePopoverContent>
    </Popover>
  );
};
