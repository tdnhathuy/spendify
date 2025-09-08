'use client'
import { TypeSchemaConfigSync } from "@/lib/components/dialogs/create-config-sync/schema";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { useMutateCreateConfigSync } from "@/lib/api/app.mutate";
import { SubmitHandler, useFormContext } from "react-hook-form";

export const FooterDialogCreateConfigSync = () => {
  const form = useFormContext<TypeSchemaConfigSync>();

  const { mutateAsync: createConfigSync } = useMutateCreateConfigSync();

  const onSubmit: SubmitHandler<TypeSchemaConfigSync> = async (data) => {
    await createConfigSync({
      email: data.email,
      walletId: data.wallet.id,
    });

    dialogs.close("create-config-sync");
  };

  return (
    <>
      <WiseButton
        size="sm"
        variant={"outline"}
        onClick={() => dialogs.close("create-config-sync")}
      >
        Cancel
      </WiseButton>
      <WiseButton
        size="sm"
        disabled={!form.watch("email") || !form.watch("wallet")}
        onClick={form.handleSubmit(onSubmit)}
      >
        Create
      </WiseButton>
    </>
  );
};
