import { Dialog } from "@/components/ui/dialog";
import { useMutateAssignWallet } from "@/lib/api/app.mutate";
import { useQueryWallet } from "@/lib/api/app.query";
import { FooterDialogAssignWallet } from "@/lib/components/dialogs/assign-wallet/footer";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { IWallet } from "@/lib/types";
import { WalletItem } from "@/modules/wallet/components/wallet-item";

export const DialogAssignWallet = () => {
  const { isOpen, data } = useDialog("assign-wallet");

  const { data: wallets = [] } = useQueryWallet();
  const { mutate: assignWallet } = useMutateAssignWallet();

  const onClick = (wallet: IWallet) => () => {
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
        footer={<FooterDialogAssignWallet />}
        ctnClassName="-translate-y-[60%]"
      >
        <div className="h-[60vh] overflow-y-auto scrollbar grid  grid-cols-2 gap-2 ">
          {wallets.map((wallet) => {
            return (
              <button
                key={wallet.id}
                onClick={onClick(wallet)}
                className="cursor-pointer"
              >
                <WalletItem wallet={wallet} />
              </button>
            );
          })}
        </div>
      </WiseDialogContent>
    </Dialog>
  );
};
