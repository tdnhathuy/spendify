import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { removeMoneyFormat } from "@/lib/helpers";
import { adjustBalance, ParamsAdjustBalance } from "@/server-action";

export const FooterDialogAdjustBalance = ({ amount }: { amount: string }) => {
  const { data } = useDialog("adjust-balance");
  const onClickAdjust = async () => {
    // const id = data?.id || "";
    // const url = apiPath.wallet.id.adjust_balance(id);

    // const json: PayloadAdjustBalance = {
    //   newBalance: Number(removeMoneyFormat(amount)) || 0,
    // };
    // client.post(url, { json });
    const params: ParamsAdjustBalance = {
      idWallet: data?.id || "",
      newAmount: Number(removeMoneyFormat(amount)),
    };

    const trans = await adjustBalance(params);
    console.log("trans", trans);
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
