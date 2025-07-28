import { PayloadCreateWallet } from "@/lib/services";
import { SchemaWallet } from "@/modules/wallet/components/wallet-dialog/schema";

export const adapterPayloadWallet = (
  form: SchemaWallet
): PayloadCreateWallet => {
  return {
    ...form,
    name: form.name,
    idIcon: form.icon?.id,
    initBalance: Number(form.initBalance),
    type: "Cash",
  };
};
