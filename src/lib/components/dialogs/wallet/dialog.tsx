import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { DialogRowInfo } from "@/lib/components/dialogs/components/dialog-row-info";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import {
  resolverWallet as resolver,
  TypeSchemaWallet,
} from "@/lib/components/dialogs/wallet/schema";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { formatMoney, formatOption } from "@/lib/helpers";
import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";

export const DialogWallet = () => {
  const { data, isOpen } = dialogs.useDialog("wallet");

  const form = useForm<TypeSchemaWallet>({ resolver });

  useDidUpdate(() => {
    form.reset({
      name: data?.name || "",
      icon: formatOption(data?.icon, "code", "url"),
      type: data?.type || "Cash",
      initBalance: data?.initBalance.toString() || "",
      // currentBalance: data?.currentBalance.toString() || "1",
      currentBalance: "12",
    });
  }, [data]);

  const { name, icon, type, initBalance, currentBalance } = form.watch();
  console.log("currentBalance", currentBalance);

  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("wallet", true)}>
      <WiseDialogContent
        title="Wallet Detail"
        headerClassName="border-b-0"
        className="p-0"
      >
        <Form {...form}>
          <span className="flex flex-col  justify-center items-center bg-gray-100 py-4 border-t border-b">
            <span className="text-lg font-semibold">{name}</span>
            <span className="text-xl font-semibold">
              {formatMoney(Number(currentBalance))}
            </span>
          </span>

          <div className="p-4">
            <DialogRowInfo icon={<Wallet />} label="Wallet" value={name} />
          </div>
        </Form>
      </WiseDialogContent>
    </Dialog>
  );
};
