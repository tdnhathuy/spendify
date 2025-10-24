import { Form } from "@/components/ui/form";
import { Sheet } from "@/components/ui/sheet";
import { useSheet } from "@/lib/components/sheets/sheet.store";
import { SheetTransactionDetailTopInfo } from "@/lib/components/sheets/transaction-detail/components/top-info";
import { useSheetTransactionDetail } from "@/lib/components/sheets/transaction-detail/sheet.controller";
import {
  WiseSheetContent,
  WiseSheetFooter,
} from "@/lib/components/wise/wise-sheet-content";
import { formatDate } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Calendar, Wallet2 } from "lucide-react";
import { ReactElement } from "react";
import { TbCategory2 } from "react-icons/tb";
import { useDidUpdate } from "rooks";

export const SheetTransactionDetail = () => {
  const { sheetProps, data } = useSheet("transaction-detail");

  const { actions, form } = useSheetTransactionDetail();

  useDidUpdate(() => {
    if (sheetProps.open && !!data) {
      form.reset({
        amount: data.amount.toString(),
        category: {
          icon: data.category?.icon,
          name: data.category?.name,
          id: data.category?.id,
        },
        wallet: {
          icon: data.wallet?.icon,
          name: data.wallet?.name,
          id: data.wallet?.id,
        },
        date: new Date(data.date),
        note: data.note || "",
      });
    }
  }, [data, sheetProps.open]);

  const { icon: cateIcon, name: cateName } = form.watch("category") || {};
  const { name: walletName } = form.watch("wallet") || {};

  const isDirty = form.formState.isDirty;

  return (
    <Form {...form}>
      <Sheet {...sheetProps}>
        <WiseSheetContent
          title="Transaction details"
          footer={<WiseSheetFooter />}
          className="gap-4"
        >
          <SheetTransactionDetailTopInfo transaction={data!} />

          <div className="flex gap-4 flex-col px-4">
            <Info
              icon={<TbCategory2 size={24} />}
              label={"Category"}
              value={cateName}
              onClick={actions.onClickCategory}
            />

            <Info
              icon={<Wallet2 />}
              label="Wallet"
              value={walletName}
              onClick={actions.onClickWallet}
            />

            <Info
              icon={<Calendar />}
              label="Date"
              value={formatDate(data?.date)}
            />

            {isDirty && <span className="text-sm text-gray-500">1</span>}
          </div>
        </WiseSheetContent>
      </Sheet>
    </Form>
  );
};

interface InfoProps {
  icon: ReactElement;
  label: string | null | undefined;
  value: string | null | undefined;
  onClick?: () => void;
}
const Info = (props: InfoProps) => {
  const { icon, label, value, onClick } = props;

  const Wrapper = onClick ? "button" : "span";

  return (
    <Wrapper
      className={cn(
        "flex items-center gap-2 cursor-default",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
      tabIndex={-1}
    >
      <span className="flex size-10 items-center justify-center p-2 rounded-sm bg-focus">
        <span className="text-white ">{icon}</span>
      </span>

      <span className="flex flex-col text-sm text-left">
        <span className="font-medium">{label}</span>
        <span className="text-gray-500 text-xs">{value}</span>
      </span>
    </Wrapper>
  );
};
