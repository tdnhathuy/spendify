import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useQueryWallet } from "@/lib/api/app.query";
import { FooterDialogCreateConfigSync } from "@/lib/components/dialogs/create-config-sync/footer";
import {
  resolverConfigSync as resolver,
  TypeSchemaConfigSync,
} from "@/lib/components/dialogs/create-config-sync/schema";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { formatOption } from "@/lib/helpers";
import { IWallet } from "@/lib/types";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const DialogCreateConfigSync = () => {
  const { isOpen } = dialogs.useDialog("create-config-sync");
  const [openPopover, setOpenPopover] = useState(false);

  const { data: wallets = [] } = useQueryWallet();

  const form = useForm<TypeSchemaConfigSync>({ resolver });

  const onSelectWallet = (wallet: IWallet) => {
    setOpenPopover(false);
    form.setValue("wallet", formatOption(wallet, "id", "name"));
    wallet.icon && form.setValue("icon", wallet.icon);
  };

  const { wallet } = form.getValues();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => dialogs.close("create-config-sync")}
    >
      <Form {...form}>
        <WiseDialogContent
          title="Create Config Sync"
          footer={<FooterDialogCreateConfigSync />}
          className="flex flex-row gap-2 py-8"
        >
          <WiseTextInput
            type="email"
            placeholder="Email"
            {...form.register("email")}
          />

          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger
              asChild
              className="w-48  flex justify-center border border-gray-200 rounded-md cursor-pointer"
            >
              <span className="flex flex-row gap-2 items-center font-semibold text-sm">
                {wallet ? (
                  <>
                    <IconPicker icon={form.getValues("icon")} size="sm" />
                    {wallet ? wallet?.label : "1"}
                  </>
                ) : (
                  "Select Wallet"
                )}
              </span>
            </PopoverTrigger>

            <WisePopoverContent className="gap-2 flex flex-col">
              {wallets.map((wallet) => {
                return (
                  <WiseButton
                    key={wallet.id}
                    className="w-full"
                    variant={"outline"}
                    onClick={() => onSelectWallet(wallet)}
                  >
                    <span>{wallet.name}</span>
                  </WiseButton>
                );
              })}
            </WisePopoverContent>
          </Popover>
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};
