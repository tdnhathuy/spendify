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

  const onClickAdjustBalance = () => {
    dialogs.open("adjust-balance", walletDetail);
  };

  return (
    <>
      <WiseButton size="sm" variant={"outline"} onClick={onClickAdjustBalance}>
        Adjust Balance
      </WiseButton>

      <div className="flex gap-1 flex-1 justify-end">
        <WiseButton
          size="sm"
          variant={"outline"}
          className=""
          onClick={onClickUpdate}
        >
          Update
        </WiseButton>

        <WiseButton size="sm" className="flex">
          Transactions
        </WiseButton>
      </div>
    </>
  );
};
