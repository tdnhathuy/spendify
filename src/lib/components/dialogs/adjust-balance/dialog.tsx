import { Dialog } from "@/components/ui/dialog";
import { FooterDialogAdjustBalance } from "@/lib/components/dialogs/adjust-balance/footer";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { formatMoney } from "@/lib/helpers";
import { useState } from "react";

export const DialogAdjustBalance = () => {
  const { isOpen, data } = useDialog("adjust-balance");

  const [amount, setAmount] = useState<string>("");

  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("adjust-balance")}>
      <WiseDialogContent
        title="Adjust Balance"
        footer={<FooterDialogAdjustBalance amount={amount} />}
        className="gap-2"
      >
        <span className="flex gap-2">
          <span className="font-semibold">Current Balance: </span>
          <span className="font-bold">{formatMoney(data?.currentBalance)}</span>
        </span>
        <WiseTextInput
          placeholder="Amount"
          className="h-12 text-center"
          style={{
            fontSize: 36,
            caretColor: amount.length ? "auto" : "transparent",
          }}
          value={amount}
          onValueChange={(value) => setAmount(value)}
          money
        />
      </WiseDialogContent>
    </Dialog>
  );
};
