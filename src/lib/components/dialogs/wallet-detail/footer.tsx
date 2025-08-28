import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { IWalletDetail } from "@/lib/types";

export const FooterDialogWalletDetail = ({
  walletDetail,
}: {
  walletDetail: IWalletDetail | undefined;
}) => {
  const onClickUpdate = () => {
    dialogs.open("create-wallet", walletDetail);
  };
  return (
    <div className="flex  gap-2 w-full">
      <WiseButton
        variant={"outline"}
        className="flex-1 flex"
        onClick={onClickUpdate}
      >
        Update wallet
      </WiseButton>
      <WiseButton className="flex-1 flex">View all transactions</WiseButton>
    </div>
  );
};
