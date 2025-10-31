import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useQueryWallet } from "@/lib/api/app.query";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { FooterDialogSplitTransaction } from "@/lib/components/dialogs/split-transaction/footer";
import {
  resolverSplitTransaction as resolver,
  TypeSchemaSplitTransaction,
} from "@/lib/components/dialogs/split-transaction/schema";
import { WiseInput } from "@/lib/components/wise/input/wise-input";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { WiseIcon } from "@/lib/components/wise/wise-icon";
import { IWallet } from "@/lib/types";
import { useForm } from "react-hook-form";

export const DialogSplitTransaction = () => {
  const { isOpen } = useDialog("split-transaction");

  const { data: wallets = [] } = useQueryWallet();

  const form = useForm<TypeSchemaSplitTransaction>({ resolver });

  return (
    <Form {...form}>
      <Dialog
        open={isOpen}
        onOpenChange={() => dialogs.close("split-transaction")}
      >
        <WiseDialogContent
          title="Split Transaction"
          className="gap-2 flex flex-row"
          footer={<FooterDialogSplitTransaction />}
        >
          <WiseInput
            type="select"
            options={wallets}
            className="w-40"
            renderItem={(item) => <Item item={item} />}
            onValueChange={(value) => form.setValue("wallet", value)}
            {...form.register("wallet")}
          />

          <WiseInput
            type="text"
            placeholder="Amount"
            {...form.register("amount")}
          />
        </WiseDialogContent>
      </Dialog>
    </Form>
  );
};

const Item = ({ item }: { item: IWallet }) => {
  return (
    <div className="flex items-center gap-2">
      <WiseIcon icon={item.icon} />
      <span>{item.name}</span>
    </div>
  );
};
