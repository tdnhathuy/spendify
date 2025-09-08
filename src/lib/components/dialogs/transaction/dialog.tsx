"use client";

import { Dialog } from "@/components/ui/dialog";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { FooterDialogTransaction } from "@/lib/components/dialogs/transaction/footer";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { formatDate, formatMoney, formatOption } from "@/lib/helpers";
import { Wallet } from "lucide-react";
import {
  IoArrowDownCircle,
  IoArrowUpCircle,
  IoCalendar,
} from "react-icons/io5";

import { TbCategory } from "react-icons/tb";

import { Form } from "@/components/ui/form";
import {
  RowInfoDialog,
  PropsDialogRowInfo,
} from "@/lib/components/dialog-row-info";
import {
  resolverTransaction,
  TypeSchemaTransaction,
} from "@/lib/components/dialogs/transaction/schema";
import { DatePicker } from "@/lib/components/shared/date-picker";
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
      type: data?.category?.type || "Expense",
      date: new Date(data.date),
      desc: data.description || "",
    });
  }, [data]);

  const { watch } = form;

  const { amount, category, wallet, type, desc, date = new Date() } = watch();

  const INFOs: PropsDialogRowInfo[] = [
    {
      icon: <Wallet />,
      label: "Wallet",
      value: wallet?.label || "Unassigned",
      onClick: () => dialogs.open("assign-wallet", data),
    },
    {
      icon: <TbCategory />,
      label: "Category",
      value: category?.label || "Unassigned",
      onClick: () => dialogs.open("assign-category", data),
    },
    {
      icon: <IoCalendar />,
      label: "Date",
      value: (
        <DatePicker
          value={date}
          onChange={(date) => {
            form.setValue("date", date);
          }}
        >
          {formatDate(date)}
        </DatePicker>
      ),
    },
    {
      icon: <PiNotePencil />,
      label: "Note",
      value: desc || "Unassigned",
    },
    {
      icon: <PiNotePencil />,
      label: "Note2",
      value: desc || "Unassigned",
    },
  ];

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
                "text-green-400": type !== "Expense",
                "text-red-400": type === "Expense",
              }
            )}
          >
            <span className={cn("flex items-center gap-2 text-xl")}>
              {type !== "Expense" ? (
                <IoArrowUpCircle className="text-2xl" />
              ) : (
                <IoArrowDownCircle className="text-2xl" />
              )}
              <span className="uppercase font-semibold text-gray-500">
                {type}
              </span>
            </span>

            <span className="text-2xl font-semibold">
              {formatMoney(Number(amount))}
            </span>
          </span>

          <div className="p-2 px-4 gap-2 flex flex-col">
            {INFOs.map((info) => (
              <RowInfoDialog key={info.label} {...info} />
            ))}
          </div>
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};
