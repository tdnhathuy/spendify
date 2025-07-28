import {
  useMutateCreateWallet,
  useMutateUpdateWallet,
} from "@/lib/api/app.mutate";
import { adapterPayloadWallet } from "@/lib/helpers/adapter.helper";
import { SchemaWallet } from "@/modules/wallet/components/wallet-dialog/schema";
import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";
import { useFormContext } from "react-hook-form";

export const useDialogWalletAction = () => {
  const actions = useStoreDialogWallet((s) => s.actions);
  const values = useStoreDialogWallet((s) => s.values);
  const form = useFormContext<SchemaWallet>();

  const { mutateAsync } = useMutateCreateWallet();
  const { mutateAsync: updateWallet } = useMutateUpdateWallet();

  const idWallet = values.wallet?.id;

  const onClickCreate = async () => {
    const payload = adapterPayloadWallet(form.getValues());
    await mutateAsync(payload);
    actions.setOpen(false);
  };

  const onClickUpdate = async () => {
    const payload = adapterPayloadWallet(form.getValues());
    updateWallet({ id: idWallet!, json: payload });
    actions.setOpen(false);
  };

  return {
    onClickCreate,
    onClickUpdate,
  };
};
