import { Dialog } from "@/components/ui/dialog";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { FooterDialogTransaction } from "@/lib/components/dialogs/transaction/footer";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { formatDate, formatMoney, formatOption } from "@/lib/helpers";
import { Wallet } from "lucide-react";
import { ReactElement } from "react";
import {
  IoArrowDownCircle,
  IoArrowUpCircle,
  IoCalendar,
} from "react-icons/io5";

import { TbCategory } from "react-icons/tb";

import { Form } from "@/components/ui/form";
import {
  resolverTransaction,
  TypeSchemaTransaction,
} from "@/lib/components/dialogs/transaction/schema";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { PiNotePencil } from "react-icons/pi";
import { useDidUpdate } from "rooks";

export const DialogTrans = () => {
  const { isOpen, data } = useDialog("trans");

  const form = useForm<TypeSchemaTransaction>({
    resolver: resolverTransaction,
  });

  useDidUpdate(() => {
    if (!data) return;
    form.reset({
      amount: String(data.amount),
      category: formatOption(data.category, "id", "name"),
      wallet: formatOption(data.wallet, "id", "name"),
    });
  }, [data]);

  const { getValues } = form;

  const {
    amount,
    category,
    wallet,
    type,
    desc,
    date = new Date(),
  } = getValues();

  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("trans")}>
      <Form {...form}>
        <WiseDialogContent
          title="Transaction"
          footer={<FooterDialogTransaction />}
          headerClassName="border-b-0 "
          className="px-0 "
          ctnClassName="w-82"
        >
          <span
            className={cn(
              "flex flex-col  justify-center items-center border-t border-b py-2",
              {
                "text-green-400": data?.category?.type !== "Expense",
                "text-red-400": data?.category?.type === "Expense",
              }
            )}
          >
            <span className={cn("flex items-center gap-2 text-xl")}>
              {data?.category?.type !== "Expense" ? (
                <IoArrowUpCircle className="text-2xl" />
              ) : (
                <IoArrowDownCircle className="text-2xl" />
              )}
              <span className="uppercase font-semibold text-gray-500">
                {data?.category?.type}
              </span>
            </span>

            <span className="text-2xl font-semibold">
              {formatMoney(Number(amount))}
            </span>
          </span>

          <div className="p-2 px-4 gap-2 flex flex-col">
            <RowInfo
              icon={<Wallet />}
              label="Wallet"
              value={wallet?.label || "Unassigned"}
              onClick={() => dialogs.open("assign-wallet", data)}
            />
            <RowInfo
              icon={<TbCategory />}
              label="Category"
              value={data?.category?.name || "Unassigned"}
              onClick={() => dialogs.open("assign-category", data)}
            />

            <RowInfo
              icon={<IoCalendar />}
              label="Date"
              value={formatDate(date)}
            />

            <RowInfo
              icon={<PiNotePencil />}
              label="Note"
              value={data?.description || "Unassigned"}
            />
          </div>
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};

const RowInfo = (props: {
  icon: ReactElement;
  label: string;
  value: string;
  onClick?: () => void;
}) => {
  const { icon, label, value, onClick } = props;
  return (
    <span
      className={cn("flex items-center gap-2 ", onClick && "cursor-pointer")}
      onClick={onClick}
    >
      <span className="bg-gray-100 p-2 w-8 h-8 flex justify-center items-center rounded-sm text-xl">
        {icon}
      </span>

      <span className="flex flex-col text-base">
        <span className="font-semibold text-xs">{label}</span>
        <span className="text-xs font-medium break-all text-gray-500">
          {value}
        </span>
      </span>
    </span>
  );
};
