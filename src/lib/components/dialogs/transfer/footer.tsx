import { useMutateCreateTransfer } from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { TypeSchemaTransfer } from "@/lib/components/dialogs/transfer/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { SubmitHandler, useFormContext } from "react-hook-form";

export const FooterDialogTransfer = () => {
  const form = useFormContext<TypeSchemaTransfer>();
  const { mutateAsync: createTransfer } = useMutateCreateTransfer();

  const onCancel = () => dialogs.close("transfer");

  const onTransfer: SubmitHandler<TypeSchemaTransfer> = async (data) => {
    await createTransfer({
      idWalletFrom: data.walletFrom?.id || "",
      idWalletTo: data.walletTo?.id || "",
      amount: data.amount,
    });
    dialogs.close("transfer");
  };

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
        onClick={form.handleSubmit(onTransfer)}
      >
        Transfer
      </WiseButton>
    </>
  );
};
