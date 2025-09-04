import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const FooterDialogAdjustBalance = ({ amount }: { amount: string }) => {
  const onClickAdjust = () => {
    console.log("1", amount);
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
