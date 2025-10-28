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
import { formatMoney } from "@/lib/helpers";
import { IWalletDetail } from "@/lib/types";
import { Edit2, Loader, Wallet } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import { useDidUpdate } from "rooks";

export const DialogWallet = () => {
  const { data, isOpen } = dialogs.useDialog("wallet");

  const id = data?.idWallet;

  const { data: detail, isLoading, dataUpdatedAt } = useQueryWalletDetail(id!);

  const form = useForm<TypeSchemaWallet>({ resolver });

  useDidUpdate(() => {
    // form.reset({
    //   name: detail?.name ?? "",
    //   icon: detail?.icon ?? "",
    //   type: detail?.type || "Cash",
    //   currentBalance: Number(detail?.currentBalance || 0),
    //   totalTransaction: detail?.totalTransaction || 0,
    //   cardNumber: detail?.cardNumber || "",
    //   cardStatementPassword: detail?.cardStatementPassword || "",
    //   cardStatementDate: formatDate(detail?.cardStatementDate),
    // });
  }, [detail, dataUpdatedAt]);

  const {
    name,
    type,
    initBalance,
    totalTransaction,
    cardNumber,
    cardStatementPassword,
  } = form.watch();

  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("wallet")}>
      <Form {...form}>
        <WiseDialogContent
          title="Wallet Detail"
          headerClassName="border-b-0"
          className="p-0"
          // footer={<FooterDialogWalletDetail walletDetail={detail} />}
          ctnClassName="w-[420px] h-[70%] -translate-y-[60%]"
        >
          {isLoading ? (
            <span className="animate-bounce">
              <Loader className="mx-auto my-20 animate-spin  " />
            </span>
          ) : (
            <>
              {/* <TopInfo detail={detail!} /> */}

              <div className="p-4 gap-2 flex flex-col">
                <RowInfoDialog
                  icon={<Wallet />}
                  label="Initial Balance"
                  value={formatMoney(initBalance)}
                />

                <RowInfoDialog
                  icon={<Wallet />}
                  label="Wallet type"
                  value={type}
                />

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

const TopInfo = ({ detail }: { detail: IWalletDetail }) => {
  const { watch } = useFormContext<TypeSchemaWallet>();

  const { icon, name, currentBalance } = watch();

  const onClickEdit = () => {
    dialogs.open("create-wallet", detail);
  };

  return (
    <div className="flex  items-center bg-foreground p-4 gap-4">
      <span className="bg-focus p-2 rounded-sm">
        <IconPicker icon={icon} disabled size="lg" />
      </span>

      <span className="flex flex-col flex-1">
        <span className="text-xl font-semibold">{name}</span>
        <span className="text-lg font-semibold">
          {formatMoney(Number(currentBalance))}
        </span>
      </span>

      <button className="hover:bg-focus p-2 rounded-sm" onClick={onClickEdit}>
        <Edit2 size={16} />
      </button>
    </div>
  );
};
