import {
  useMutateCreateWallet,
  useMutateDeleteWallet,
  useMutateUpdateWallet,
} from "@/lib/api/app.mutate";
import { TypeSchemaCreateWallet } from "@/lib/components/dialogs/create-wallet/schema";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { FieldErrors, useFormContext } from "react-hook-form";

export const FooterDialogCreateWallet = () => {
  const { data } = dialogs.useDialog("create-wallet");

  const { handleSubmit, formState } = useFormContext<TypeSchemaCreateWallet>();
  const { isValid } = formState;

  const { mutateAsync: createWallet, isPending: isCreating } =
    useMutateCreateWallet();
  const { mutateAsync: updateWallet, isPending: isUpdating } =
    useMutateUpdateWallet();
  const { mutateAsync: deleteWallet, isPending: isDeleting } =
    useMutateDeleteWallet();

  const isUpdate = !!data;
  const titleButton = isUpdate ? "Update" : "Create";

  const onClickDelete = async () => {
    await deleteWallet(data?.id ?? "");
    dialogs.closeAll();
  };

  const onSubmit = async (form: TypeSchemaCreateWallet) => {
    if (isUpdate) {
      await updateWallet({
        id: data.id,
        cardNumber: form.cardNumber ?? "",
        cardStatementPassword: form.cardStatementPassword ?? "",
        cardStatementDate: form.cardStatementDate ?? "",
        idIcon: form.icon?.id ?? "",
        initBalance: Number(form.initBalance),
        name: form.name,
        type: form.type,
      });

      dialogs.close("create-wallet");
      return;
    }

    createWallet({
      name: form.name,
      initBalance: Number(form.initBalance),
      idIcon: form.icon?.id ?? "",
      type: form.type,
      cardNumber: form.cardNumber ?? "",
      cardStatementPassword: form.cardStatementPassword ?? "",
      cardStatementDate: form.cardStatementDate ?? "",
    });

    dialogs.close("create-wallet");
  };

  const onError = (errors: FieldErrors<TypeSchemaCreateWallet>) => {
    console.log("errors", errors);
  };

  return (
    <>
      {isUpdate ? (
        <WiseButton
          size="sm"
          variant={"destructive"}
          onClick={onClickDelete}
          disabled={isDeleting}
        >
          Delete
        </WiseButton>
      ) : (
        <span></span>
      )}

      <div className="flex gap-2">
        <WiseButton
          size="sm"
          variant={"outline"}
          onClick={() => dialogs.close("create-wallet")}
        >
          Cancel
        </WiseButton>

        <WiseButton
          size="sm"
          onClick={handleSubmit(onSubmit, onError)}
          disabled={!isValid || isCreating || isUpdating || isDeleting}
        >
          {titleButton}
        </WiseButton>
      </div>
    </>
  );
};
