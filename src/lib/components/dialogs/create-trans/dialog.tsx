import { Dialog } from "@/components/ui/dialog";
import { FooterDialogCreateTrans } from "@/lib/components/dialogs/create-trans/footer";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const DialogCreateTrans = () => {
  const { isOpen } = useDialog("create-trans");

  const [amount, setAmount] = useState<string>("");

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={() => dialogs.close("create-trans")}
    >
      <WiseDialogContent
        title="Create Transaction"
        footer={
          <FooterDialogCreateTrans
            amount={amount}
            onSuccess={() => {
              dialogs.close("create-trans");
              setAmount("");
            }}
          />
        }
        className="p-0"
      >
        <span>
          <WiseTextInput
            className={cn(
              "border-none shadow-none py-8 font-bold text-center",
              !amount.length && "caret-transparent"
            )}
            placeholder="Amount"
            style={{ fontSize: 36 }}
            inputMode="numeric"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </span>
      </WiseDialogContent>
    </Dialog>
  );
};
