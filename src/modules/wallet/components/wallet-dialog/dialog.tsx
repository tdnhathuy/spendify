import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LabelBlock } from "@/lib/components/shared/label-block";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { schemaWallet } from "@/modules/wallet/components/wallet-dialog/schema";
import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const DialogWallet = () => {
  const actions = useStoreDialogWallet((s) => s.actions);
  const values = useStoreDialogWallet((s) => s.values);
  console.log("values", values.wallet);

  const wallet = values.wallet;
  const title = !!wallet ? "Edit Wallet" : "Add Wallet";

  const form = useForm<z.infer<typeof schemaWallet>>({
    resolver: zodResolver(schemaWallet),
    defaultValues: {
      name: wallet?.name || "",
      initBalance: wallet?.initBalance.toString() || "",
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
      <WiseDialogContent className="w-sm" title={title} footer={<Footer />}>
        <Form {...form}>
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
        </Form>
      </WiseDialogContent>
    </Dialog>
  );
};

const Footer = () => {
  return (
    <>
      <DialogClose asChild>
        <WiseButton size={"sm"} variant={"ghost"}>
          Cancel
        </WiseButton>
      </DialogClose>

      <WiseButton size={"sm"} variant={"outline"}>
        Create
      </WiseButton>
    </>
  );
};
