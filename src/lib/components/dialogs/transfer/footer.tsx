"use client";
import {
  useMutateCreateTransfer,
  useMutateMarkTransfer,
} from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { TypeSchemaTransfer } from "@/lib/components/dialogs/transfer/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { FieldErrors, SubmitHandler, useFormContext } from "react-hook-form";

export const FooterDialogTransfer = () => {
  const form = useFormContext<TypeSchemaTransfer>();
  const { mutateAsync: createTransfer } = useMutateCreateTransfer();
  const { mutateAsync: markTransfer } = useMutateMarkTransfer();

  const onCancel = () => dialogs.close("transfer");

  const isMarkTransfer = !!form.watch("idTransaction");

  const onTransfer: SubmitHandler<TypeSchemaTransfer> = async (data) => {
    if (isMarkTransfer) {
      const {
        idTransaction = "",
        amount,
        idWalletFrom,
        idWalletTo = "",
      } = data;
      await markTransfer({
        idTransaction: idTransaction || "",
        idWalletTo: idWalletTo || "",
        amount: Number(amount),
        fee: 0,
      });
    } else {
      // await createTransfer({
      //   idWalletFrom: data.walletFrom?.id || "",
      //   idWalletTo: data.walletTo?.id || "",
      //   amount: data.amount,
      // });
    }

    dialogs.close("transfer");
  };

  const onError = (errors: FieldErrors<TypeSchemaTransfer>) => {
    console.log("errors", errors);
  };

  const isDisable =
    !form.watch("idWalletFrom") ||
    !form.watch("idWalletTo") ||
    !form.watch("amount");

  return (
    <>
      <WiseButton
        variant={"outline"}
        className="flex flex-1"
        onClick={onCancel}
      >
        Cancel
      </WiseButton>

      <WiseButton
        variant={"default"}
        className="flex flex-1"
        disabled={isDisable}
        onClick={form.handleSubmit(onTransfer, onError)}
      >
        {form.watch("idTransaction") ? "Mark Transfer" : "Transfer"}
      </WiseButton>
    </>
  );
};
