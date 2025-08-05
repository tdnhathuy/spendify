import { DialogClose } from "@/components/ui/dialog";
import { useMutateCreateTrans } from "@/lib/api/app.mutate";
import { useStoreDialog } from "@/lib/components/dialogs/dialog.store";
import { TypeSchemaTransaction } from "@/lib/components/dialogs/transaction/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { useFormContext } from "react-hook-form";

export const FooterDialogTransaction = () => {
  const { type, data } = useStoreDialog();

  const { mutateAsync: create } = useMutateCreateTrans();

  const isCreate = type === "trans" && data === null;

  const form = useFormContext<TypeSchemaTransaction>();

  const onClickConfirm = () => {
    create({
      amount: "10000",
      date: new Date(),
      desc: "test",
      idWallet: null,
      idCategory: null,
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <DialogClose asChild>
        <WiseButton size={"sm"} variant={"outline"}>
          Cancel
        </WiseButton>
      </DialogClose>

      <WiseButton size={"sm"} onClick={onClickConfirm}>
        {isCreate ? "Create" : "Update"}
      </WiseButton>
    </div>
  );
};
