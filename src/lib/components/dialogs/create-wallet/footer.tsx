import { useMutateCreateWallet } from "@/lib/api/app.mutate";
import { TypeSchemaCreateWallet } from "@/lib/components/dialogs/create-wallet/schema";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { FieldErrors, useFormContext } from "react-hook-form";

export const FooterDialogCreateWallet = () => {
  const { handleSubmit, formState } = useFormContext<TypeSchemaCreateWallet>();
  const { isValid } = formState;

  const { mutate: createWallet } = useMutateCreateWallet();

  const onSubmit = (data: TypeSchemaCreateWallet) => {
    createWallet({
      name: data.name,
      initBalance: Number(data.initBalance),
      idIcon: data.icon?.id ?? "",
      type: data.type,
      cardNumber: data.cardNumber ?? "",
      cardStatementPassword: data.cardStatementPassword ?? "",
      cardStatementDate: data.cardStatementDate ?? "",
    });
  };

  const onError = (errors: FieldErrors<TypeSchemaCreateWallet>) => {
    console.log("errors", errors);
  };

  return (
    <>
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
        disabled={!isValid}
      >
        Create
      </WiseButton>
    </>
  );
};
