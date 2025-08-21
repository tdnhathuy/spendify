import { WrapperWallet } from "@/modules/wallet/components/wrapper-wallet";
import { Plus } from "lucide-react";

export const ButtonAddWallet = () => {
  return (
    <WrapperWallet
      className="flex justify-center items-center cursor-pointer border-dashed border-2"
      onClick={() => {}}
    >
      <span className="text-center gap-2 flex items-center justify-center flex-col text-sm ">
        <Plus />
        <span>Add Wallet</span>
      </span>
    </WrapperWallet>
  );
};
