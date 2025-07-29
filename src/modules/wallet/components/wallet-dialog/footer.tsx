import { DialogClose } from "@/components/ui/dialog";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { useDialogWalletAction } from "@/modules/wallet/components/wallet-dialog/action";
import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";

export const FooterDialogWallet = () => {
  const values = useStoreDialogWallet((s) => s.values);

  const idWallet = values.wallet?.id;
  const isUpdate = !!idWallet;

  const { onClickCreate, onClickUpdate } = useDialogWalletAction();

  const renderButton = (label: string, onClick: () => void) => {
    return (
      <WiseButton
        // disabled={isDisabled}
        size={"sm"}
        variant={"outline"}
        onClick={onClick}
        className="w-24"
      >
        {label}
      </WiseButton>
    );
  };

  return (
    <>
      <DialogClose asChild>
        <WiseButton size={"sm"} variant={"ghost"}>
          Cancel
        </WiseButton>
      </DialogClose>

      {isUpdate
        ? renderButton("Update", onClickUpdate)
        : renderButton("Create", onClickCreate)}
    </>
  );
};
