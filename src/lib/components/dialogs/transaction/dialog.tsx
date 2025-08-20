import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";
import { Dialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  closeDialog,
  useStoreDialog,
} from "@/lib/components/dialogs/dialog.store";
import {
  resolverTransaction,
  type TypeSchemaTransaction,
} from "@/lib/components/dialogs/transaction/schema";
import { LabelBlock } from "@/lib/components/shared/label-block";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import {
  FooterDialogTransaction,
  InputCategory,
  InputType,
  InputWallet,
} from "./";

export const DialogTrans = () => {
  const { type, data } = useStoreDialog();

  const title = data === null ? "New Transaction" : "Edit Transaction";

  const form = useForm<TypeSchemaTransaction>({
    resolver: resolverTransaction,
  });

  useDidUpdate(() => {
    if (type === "trans") {
      const {
        amount = "",
        description = "",
        date,
        category,
        wallet,
      } = data || {};

      form.reset({
        amount: amount.toString(),
        desc: description || "",
        date: date,
        category: category?.id
          ? { id: category?.id, label: category?.name }
          : null,
        wallet: wallet?.id ? { id: wallet?.id, label: wallet?.name } : null,
        type: category?.type || "Expense",
      });
    }
  }, [type, data]);

  return (
    <Form {...form}>
      <Dialog open={type === "trans"} onOpenChange={() => closeDialog()}>
        <WiseDialogContent title={title} footer={<FooterDialogTransaction />}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <LabelBlock label="Amount">
                  <Input {...field} autoComplete="off" />
                </LabelBlock>
              );
            }}
          />

          <FormField name="type" render={InputType} />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => <InputCategory {...field} />}
            />
            <FormField
              control={form.control}
              name="wallet"
              render={({ field }) => <InputWallet {...field} />}
            />
          </div>
        </WiseDialogContent>
      </Dialog>
    </Form>
  );
};
