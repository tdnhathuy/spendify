import { MutationKeys, queryClient, QueryKeys } from "@/lib/configs";
import { ServiceWallet } from "@/lib/services";
import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";
import { WrapperWallet } from "@/modules/wallet/components/wrapper-wallet";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";

export const ButtonAddWallet = () => {
  const mutation = useMutation({
    mutationKey: [MutationKeys.createWallet],
    mutationFn: ServiceWallet.create,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QueryKeys.getWallet] });
    },
  });

  const actions = useStoreDialogWallet((s) => s.actions);

  return (
    <WrapperWallet
      className="flex justify-center items-center cursor-pointer"
      onClick={() => {
        actions.setOpen(true);
        console.log('1', 1)
      }}
    >
      <span className="text-center gap-2 flex items-center justify-center flex-col text-sm ">
        <Plus />
        <span>Add Wallet</span>
      </span>
    </WrapperWallet>
  );
};
