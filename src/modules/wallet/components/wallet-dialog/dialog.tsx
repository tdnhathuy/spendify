import { Dialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { LabelBlock } from "@/lib/components/shared/label-block";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { FooterDialogWallet } from "@/modules/wallet/components/wallet-dialog/footer";
import {
  SchemaWallet,
  schemaWallet,
} from "@/modules/wallet/components/wallet-dialog/schema";
import { useStoreDialogWallet } from "@/modules/wallet/components/wallet-dialog/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";

export const DialogWallet = () => {
  const actions = useStoreDialogWallet((s) => s.actions);
  const values = useStoreDialogWallet((s) => s.values);

  const wallet = values.wallet;
  const title = !!wallet ? "Edit Wallet" : "Add Wallet";

  const form = useForm<SchemaWallet>({
    resolver: zodResolver(schemaWallet),
    mode: "onChange",
  });

  useDidUpdate(() => {
    if (values.open) {
      form.reset({
        name: wallet?.name || "",
        initBalance: wallet?.initBalance.toString() || "",
        icon: wallet?.icon || { id: "", url: "", code: "" },
      });
    }
  }, [values.open]);

  return (
    <Dialog open={values.open} onOpenChange={actions.setOpen}>
      <Form {...form}>
        <WiseDialogContent
          className="w-sm"
          title={title}
          footer={<FooterDialogWallet />}
        >
          <div>
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <IconPicker icon={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          <LabelBlock label="Wallet Name">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input tabIndex={-1} {...field} value={field.value} />
              )}
            />
          </LabelBlock>

          <LabelBlock label="Init Balance">
            <FormField
              control={form.control}
              name="initBalance"
              render={({ field }) => (
                <Input tabIndex={-1} {...field} value={field.value} />
              )}
            />
          </LabelBlock>
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};
