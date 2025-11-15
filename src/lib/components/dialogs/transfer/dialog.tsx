"use client";

import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { FooterDialogTransfer } from "@/lib/components/dialogs/transfer/footer";
import { InputWalletSelector } from "@/lib/components/dialogs/transfer/inputs/wallet-selector.input";
import {
  resolverTransfer as resolver,
  TypeSchemaTransfer,
} from "@/lib/components/dialogs/transfer/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { useForm } from "react-hook-form";
import { BiTransferAlt } from "react-icons/bi";
import { useDidUpdate } from "rooks";

export const DialogTransfer = () => {
  const { isOpen, data } = useDialog("transfer");

  const form = useForm<TypeSchemaTransfer>({ resolver });

  useDidUpdate(() => {
    if (isOpen && !!data) {
      form.reset(data);
    }
  }, [isOpen, data]);

  const onClickSwap = () => {
    const { idWalletFrom, idWalletTo } = form.getValues();
    form.setValue("idWalletFrom", idWalletTo);
    form.setValue("idWalletTo", idWalletFrom);
  };

  const isDisableSwap = !!form.getValues("idTransaction");

  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("transfer")}>
      <Form {...form}>
        <WiseDialogContent
          title="Transfer"
          footer={<FooterDialogTransfer />}
          className="gap-4 py-8"
        >
          <div className="flex gap-2 justify-between px-2">
            <InputWalletSelector
              value={form.watch("idWalletFrom") || ""}
              onValueChange={(id) => form.setValue("idWalletFrom", id)}
              disabled={isDisableSwap}
            />

            <WiseButton
              size="icon"
              onClick={onClickSwap}
              disabled={isDisableSwap}
            >
              <BiTransferAlt />
            </WiseButton>

            <InputWalletSelector
              excludeWallets={[form.watch("idWalletFrom") || ""]}
              value={form.watch("idWalletTo") || ""}
              onValueChange={(id) => {
                console.log("id", id);
                form.setValue("idWalletTo", id);
              }}
            />
          </div>

          <WiseTextInput
            disabled={isDisableSwap}
            className="text-2xl py-8 text-center font-semibold"
            placeholder="Amount"
            style={{ fontSize: 36 }}
            value={form.watch("amount") || ""}
            onValueChange={(value) => form.setValue("amount", value)}
            money
          />
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};
