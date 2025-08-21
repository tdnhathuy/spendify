import { Dialog, DialogClose } from "@/components/ui/dialog";
import { useMutateAssignWallet } from "@/lib/api/app.mutate";
import { useQueryWallet } from "@/lib/api/app.query";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { IWallet } from "@/lib/types";
import { WalletItem } from "@/modules/wallet/components/wallet-item";

export const DialogAssignWallet = () => {
  const { isOpen, data } = useDialog("assign-wallet");

  const { data: wallets = [] } = useQueryWallet();
  const { mutate: assignWallet, isPending } = useMutateAssignWallet();

  const onClick = (wallet: IWallet) => {
    if (!data?.id) return;
    assignWallet(
      {
        idWallet: wallet.id,
        idTransaction: data?.id,
      },
      { onSuccess: () => dialogs.close("assign-wallet") }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("assign-wallet")}>
      <WiseDialogContent
        title="Assign Wallet"
        footer={
          <DialogClose asChild>
            <WiseButton disabled={isPending}>Close</WiseButton>
          </DialogClose>
        }
      >
        {wallets.map((wallet) => {
          return (
            <WalletItem key={wallet.id} wallet={wallet} onClick={onClick} />
          );
        })}
      </WiseDialogContent>
    </Dialog>
  );
};
