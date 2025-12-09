import { useMutateAdjustBalance } from "@/lib/api/app.mutate";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { removeMoneyFormat } from "@/lib/helpers";
import { adjustBalance, ParamsAdjustBalance } from "@/server-action";

export const FooterDialogAdjustBalance = ({ amount }: { amount: string }) => {
  const { data } = useDialog("adjust-balance");
  const { mutateAsync: mutateAdjustBalance } = useMutateAdjustBalance();
  const onClickAdjust = async () => {
    const params: ParamsAdjustBalance = {
      idWallet: data?.id || "",
      newAmount: Number(removeMoneyFormat(amount)),
    };

    await mutateAdjustBalance(params);
    dialogs.close("adjust-balance");
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
