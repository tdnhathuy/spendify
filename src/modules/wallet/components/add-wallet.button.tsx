import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";
import { WrapperWallet } from "@/modules/wallet/components/wrapper-wallet";
import { Plus } from "lucide-react";

export const ButtonAddWallet = () => {
  const actions = useStoreDialogWallet((s) => s.actions);

  return (
    <WrapperWallet
      className="flex justify-center items-center cursor-pointer"
      onClick={() => {
        actions.setOpen(true);
      }}
    >
      <span className="text-center gap-2 flex items-center justify-center flex-col text-sm ">
        <Plus />
        <span>Add Wallet</span>
      </span>
    </WrapperWallet>
  );
};
