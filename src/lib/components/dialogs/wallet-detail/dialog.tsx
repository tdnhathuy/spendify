"use client";
import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useQueryWalletDetail } from "@/lib/api/app.query";
import { RowInfoDialog } from "@/lib/components/dialog-row-info";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { FooterDialogWalletDetail } from "@/lib/components/dialogs/wallet-detail/footer";
import {
  resolverWallet as resolver,
  TypeSchemaWallet,
} from "@/lib/components/dialogs/wallet-detail/schema";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { formatDate, formatMoney } from "@/lib/helpers";
import { Loader, Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";

export const DialogWallet = () => {
  const { data, isOpen } = dialogs.useDialog("wallet");

  const id = data?.idWallet;

  const { data: detail, isLoading, dataUpdatedAt } = useQueryWalletDetail(id!);

  const form = useForm<TypeSchemaWallet>({ resolver });

  useDidUpdate(() => {
    form.reset({
      name: detail?.name || "",
      icon: detail?.icon,
      type: detail?.type || "Cash",
      initBalance: Number(detail?.initBalance || 0),
      currentBalance: Number(detail?.currentBalance || 0),
      totalTransaction: detail?.totalTransaction || 0,
      cardNumber: detail?.cardNumber || "",
      cardStatementPassword: detail?.cardStatementPassword || "",
      cardStatementDate: formatDate(detail?.cardStatementDate),
    });
  }, [detail, dataUpdatedAt]);

  const {
    name,
    icon,
    type,
    initBalance,
    currentBalance,
    totalTransaction,
    cardNumber,
    cardStatementDate,
    cardStatementPassword,
  } = form.watch();

  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("wallet")}>
      <Form {...form}>
        <WiseDialogContent
          title="Wallet Detail"
          headerClassName="border-b-0"
          className="p-0"
          footer={<FooterDialogWalletDetail walletDetail={detail} />}
          ctnClassName="w-[420px] h-[70%] -translate-y-[60%]"
        >
          {isLoading ? (
            <span className="animate-bounce">
              <Loader className="mx-auto my-20 animate-spin  " />
            </span>
          ) : (
            <>
              <span className="flex flex-col  justify-center items-center bg-green-100 py-4 border-t border-b">
                <span className="flex items-center gap-2">
                  <IconPicker icon={icon} disabled size="sm" />
                  <span className="text-lg font-semibold">{name}</span>
                </span>
                <span className="text-xl font-semibold">
                  {formatMoney(Number(currentBalance))}
                </span>
              </span>

              <div className="p-4 gap-2 flex flex-col">
                <RowInfoDialog icon={<Wallet />} label="Wallet" value={name} />
                <RowInfoDialog icon={<Wallet />} label="Wallet" value={type} />
                <RowInfoDialog
                  icon={<Wallet />}
                  label="Card Number"
                  value={cardNumber || ""}
                />
                <RowInfoDialog
                  icon={<Wallet />}
                  label="Card Statement Password"
                  value={cardStatementPassword || ""}
                />
                <RowInfoDialog
                  icon={<Wallet />}
                  label="Initial Balance"
                  value={formatMoney(initBalance)}
                />
                <RowInfoDialog
                  icon={<Wallet />}
                  label="Total Transaction"
                  value={totalTransaction + ""}
                />
              </div>
            </>
          )}
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};
