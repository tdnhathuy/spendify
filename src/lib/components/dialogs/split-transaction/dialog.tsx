import { Dialog } from "@/components/ui/dialog";
import { SelectItem } from "@/components/ui/select";
import { useQueryWallet } from "@/lib/api/app.query";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { FooterDialogSplitTransaction } from "@/lib/components/dialogs/split-transaction/footer";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WiseSelection } from "@/lib/components/wise/select/wise-select";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { IWallet } from "@/lib/types";
import { useState } from "react";

export const DialogSplitTransaction = () => {
  const { isOpen } = useDialog("split-transaction");

  const { data: wallets = [] } = useQueryWallet();

  const [wallet, setWallet] = useState<IWallet>();
  const [amount, setAmount] = useState<string>("");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => dialogs.close("split-transaction")}
    >
      <WiseDialogContent
        title="Split Transaction"
        className="gap-2 flex flex-row"
        footer={
          <FooterDialogSplitTransaction wallet={wallet} amount={amount} />
        }
      >
        <WiseSelection
          className="w-72"
          options={wallets}
          fieldValue="id"
          fieldLabel="name"
          onChange={setWallet}
          renderItem={({ name, id, icon }) => {
            return (
              <SelectItem key={id} value={id}>
                <IconPicker icon={icon} size="sm" />
                <span>{name}</span>
              </SelectItem>
            );
          }}
        />

        <WiseTextInput
          placeholder="Amount"
          inputMode="numeric"
          className="caret-accent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </WiseDialogContent>
    </Dialog>
  );
};
