import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { LabelBlock } from "@/lib/components/shared/label-block";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import {
  SchemaWallet,
  schemaWallet,
} from "@/modules/wallet/components/wallet-dialog/schema";
import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";

export const DialogWallet = () => {
  const actions = useStoreDialogWallet((s) => s.actions);
  const values = useStoreDialogWallet((s) => s.values);
  console.log("values", values.wallet);

  const wallet = values.wallet;
  const title = !!wallet ? "Edit Wallet" : "Add Wallet";

  const form = useForm<SchemaWallet>({
    resolver: zodResolver(schemaWallet),
    defaultValues: {
      name: wallet?.name || "",
      initBalance: wallet?.initBalance.toString() || "",
      icon: wallet?.icon || null,
    },
  });
  return (
    <Dialog
      open={values.open}
      onOpenChange={(open) => {
        actions.setOpen(open);
        form.reset();
      }}
    >
      <Form {...form}>
        <WiseDialogContent className="w-sm" title={title} footer={<Footer />}>
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => <IconPicker onChange={field.onChange} />}
          />

          <LabelBlock label="Wallet Name">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => <Input {...field} value={field.value} />}
            />
          </LabelBlock>

          <LabelBlock label="Init Balance">
            <FormField
              control={form.control}
              name="initBalance"
              render={({ field }) => <Input {...field} value={field.value} />}
            />
          </LabelBlock>
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};

const Footer = () => {
  const form = useFormContext<SchemaWallet>();

  const onClickCreate = () => {
    console.log("form.getValues", form.getValues());
  };
  return (
    <>
      <DialogClose asChild>
        <WiseButton size={"sm"} variant={"ghost"}>
          Cancel
        </WiseButton>
      </DialogClose>

      <WiseButton size={"sm"} variant={"outline"} onClick={onClickCreate}>
        Create
      </WiseButton>
    </>
  );
};
