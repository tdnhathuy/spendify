import { useMutateToasty } from "@/hooks/use-query-toast";
import { useMutateUpdateWallet } from "@/lib/api/app.mutate";
import { sheets } from "@/lib/components/sheets/sheet.store";
import { TypeSchemaWalletDetail } from "@/lib/components/sheets/wallet-detail/schema";
import { WiseSheetFooter } from "@/lib/components/wise/wise-sheet-content";
import { useFormContext } from "react-hook-form";

export const FooterSheetWalletDetail = () => {
  const { formState, handleSubmit } = useFormContext<TypeSchemaWalletDetail>();
  const isDirty = formState.isDirty;

  const { mutate: updateWallet } = useMutateToasty(
    useMutateUpdateWallet,
    "deleteTransaction"
  );

  const onClickUpdate = () => {
    handleSubmit((wallet) => {
      sheets.close("wallet-detail");
      updateWallet({ wallet });
    })();
  };

  return (
    <WiseSheetFooter
      buttons={[
        {
          label: "Back",
          variant: "outline",
          className: "flex-1",
          onClick: () => sheets.close("wallet-detail"),
        },
        {
          label: "Update",
          variant: "default",
          className: "flex-1",
          disabled: !isDirty,
          onClick: onClickUpdate,
        },
      ]}
    />
  );
};
