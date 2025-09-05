import { PayloadMarkTransfer } from "@/app/api/transaction/[id]/mark-transfer/route";
import {
  useMutateCreateTransfer,
  useMutateMarkTransfer,
  useMutateUnmarkTransfer,
} from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { TypeSchemaTransfer } from "@/lib/components/dialogs/transfer/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { SubmitHandler, useFormContext } from "react-hook-form";

export const FooterDialogTransfer = () => {
  const form = useFormContext<TypeSchemaTransfer>();
  const { mutateAsync: createTransfer } = useMutateCreateTransfer();
  const { mutateAsync: markTransfer } = useMutateMarkTransfer();

  const onCancel = () => dialogs.close("transfer");

  const onTransfer: SubmitHandler<TypeSchemaTransfer> = async (data) => {
    if (data.isMarkTransfer) {
      const { idTransaction = "", amount, walletFrom, walletTo } = data;
      const payload: PayloadMarkTransfer = {
        amount,
        idTransaction,
        idWalletTo: walletTo?.id || "",
        idWalletFrom: walletFrom?.id || "",
      };
      await markTransfer(payload);
    } else {
      await createTransfer({
        idWalletFrom: data.walletFrom?.id || "",
        idWalletTo: data.walletTo?.id || "",
        amount: data.amount,
      });
    }

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
        {form.watch("isMarkTransfer") ? "Mark Transfer" : "Transfer"}
      </WiseButton>
    </>
  );
};
