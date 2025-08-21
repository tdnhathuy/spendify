import { Dialog } from "@/components/ui/dialog";
import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { FooterDialogTransaction } from "@/lib/components/dialogs/transaction/footer";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { formatMoney, formatTitleDate } from "@/lib/helpers";
import { Wallet } from "lucide-react";
import { ReactElement } from "react";
import {
  IoArrowDownCircle,
  IoArrowUpCircle,
  IoCalendar,
  IoTime,
} from "react-icons/io5";

import { TbCategory } from "react-icons/tb";

import { PiNotePencil } from "react-icons/pi";
import { cn } from "@/lib/utils";

export const DialogTrans = () => {
  const { isOpen, data } = useDialog("trans");

  if (!data) return null;
  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("trans")}>
      <WiseDialogContent
        title="Transaction"
        footer={<FooterDialogTransaction />}
        headerClassName="border-b-0 "
        className="px-0 "
        ctnClassName="w-82"
      >
        <span className="flex flex-col gap-2 justify-center items-center border-t border-b py-2">
          <span className="flex items-center gap-2 text-xl">
            {data.category?.type === "Expense" ? (
              <IoArrowUpCircle className="text-green-400 text-2xl" />
            ) : (
              <IoArrowDownCircle className="text-red-400 text-2xl" />
            )}
            <span className="uppercase">{data.category?.type}</span>
          </span>
          <span className="text-2xl font-semibold">
            {formatMoney(data.amount)}
          </span>
        </span>

        <div className="p-2 px-4 gap-1 flex flex-col">
          <RowInfo icon={<Wallet />} label="Wallet" value={""} />
          <RowInfo
            icon={<TbCategory />}
            label="Category"
            value={data.category?.name || "Unassigned"}
            onClick={() => dialogs.open("assign-category", data)}
          />
          <RowInfo icon={<IoCalendar />} label="Date" value={""} />
          <RowInfo
            icon={<PiNotePencil />}
            label="Note"
            value={data.description || "Unassigned"}
          />
        </div>
      </WiseDialogContent>
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
        <span className="text-xs">{value}</span>
      </span>
    </span>
  );
};
