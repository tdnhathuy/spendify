import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { adjustBalance, ParamsAdjustBalance } from "@/server-action";

export const FooterDialogAdjustBalance = ({ amount }: { amount: string }) => {
  const { data } = useDialog("adjust-balance");
  const onClickAdjust = () => {
    // const id = data?.id || "";
    // const url = apiPath.wallet.id.adjust_balance(id);

    // const json: PayloadAdjustBalance = {
    //   newBalance: Number(removeMoneyFormat(amount)) || 0,
    // };
    // client.post(url, { json });
    const params: ParamsAdjustBalance = {
      amount: Number(amount),
      idWallet: data?.id || "",
    };
    adjustBalance(params);
  };

  return (
    <>
      <WiseButton
        variant={"outline"}
        onClick={() => dialogs.close("adjust-balance")}
      >
        Cancel
      </WiseButton>
      <WiseButton onClick={onClickAdjust} disabled={!amount.length}>
        Adjust
      </WiseButton>
    </>
  );
};
