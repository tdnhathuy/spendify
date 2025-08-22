import { TypeSchemaCreateWallet } from "@/lib/components/dialogs/create-wallet/inputs/schema";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { FieldErrors, useFormContext } from "react-hook-form";

export const FooterDialogCreateWallet = () => {
  const { handleSubmit, watch, formState } =
    useFormContext<TypeSchemaCreateWallet>();
  watch();

  const { isValid } = formState;

  const onSubmit = (data: TypeSchemaCreateWallet) => {
    console.log("data", data);
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
