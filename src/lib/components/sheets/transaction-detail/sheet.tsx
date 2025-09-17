import { Sheet } from "@/components/ui/sheet";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { LabelBlock } from "@/lib/components/shared/label-block";
import { useSheet } from "@/lib/components/sheets/sheet.store";
import {
  WiseSheetContent,
  WiseSheetFooter,
} from "@/lib/components/wise/wise-sheet-content";
import { WiseTextArea } from "@/lib/components/wise/wise-text-arena";
import { formatDate, formatMoney } from "@/lib/helpers";
import { Calendar, Wallet2 } from "lucide-react";
import { ReactElement } from "react";

export const SheetTransactionDetail = () => {
  const { sheetProps, data } = useSheet("transaction-detail");

  const { category, wallet } = data || {};

  const amount = data?.amount || 0;

  return (
    <Sheet {...sheetProps}>
      <WiseSheetContent
        title="Transaction details"
        footer={<WiseSheetFooter />}
        className="gap-4"
      >
        <div className="flex items-center gap-2  justify-center py-4 flex-col border-b">
          <span className="bg-gray-100 p-4 rounded-sm">
            <IconPicker disabled size="lg" icon={category?.icon} />
          </span>

          <span className="text-lg font-semibold">{category?.name}</span>

          <span className="text-2xl font-semibold">{formatMoney(amount)}</span>
        </div>

        <div className="flex gap-4 flex-col px-4">
          <Info
            icon={<Calendar />}
            label="Date"
            value={formatDate(data?.date)}
          />

          <Info icon={<Wallet2 />} label="Wallet" value={wallet?.name || ""} />

          <LabelBlock label="Note">
            <WiseTextArea
              tabIndex={-1}
              value={data?.description || ""}
              onChange={() => {}}
              className="h-24 "
            />
          </LabelBlock>
        </div>
      </WiseSheetContent>
    </Sheet>
  );
};

interface InfoProps {
  icon: ReactElement;
  label: string;
  value: string | null | undefined;
}
const Info = (props: InfoProps) => {
  const { icon, label, value } = props;
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center justify-center p-2 rounded-sm bg-gray-100">
        {icon}
      </span>

      <span className="flex flex-col text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-gray-500 text-xs">{value}</span>
      </span>
    </div>
  );
};
