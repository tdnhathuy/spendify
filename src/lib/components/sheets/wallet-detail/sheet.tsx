import { Form } from "@/components/ui/form";
import { Sheet } from "@/components/ui/sheet";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { useSheet } from "@/lib/components/sheets/sheet.store";
import { FooterSheetWalletDetail } from "@/lib/components/sheets/wallet-detail/footer";
import {
  resolverWalletDetail as resolver,
  TypeSchemaWalletDetail,
} from "@/lib/components/sheets/wallet-detail/schema";
import { WiseInput } from "@/lib/components/wise/input/wise-input";
import { WiseSheetContent } from "@/lib/components/wise/wise-sheet-content";
import { formatMoney } from "@/lib/helpers";
import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";

export const SheetWalletDetail = () => {
  const { sheetProps, data } = useSheet("wallet-detail");

  const form = useForm<TypeSchemaWalletDetail>({ resolver });

  useDidUpdate(() => {
    if (!data) return;
    form.reset({
      id: data.id,
      name: data.name,
      initBalance: formatMoney(data.initBalance),
      icon: data.icon,
    });
  }, [data]);

  if (!data) return null;
  return (
    <Form {...form}>
      <Sheet {...sheetProps}>
        <WiseSheetContent
          title={"Wallet Details"}
          footer={<FooterSheetWalletDetail />}
        >
          <div className="flex flex-col  border-t">
            <div className="flex gap-4 p-4 items-center bg-foreground">
              <IconPicker
                icon={form.watch("icon")}
                size={70}
                onChange={(icon) => form.setValue("icon", icon)}
              />
              <span className="flex flex-col">
                <span className="text-sm text-gray-500">Current Balance</span>
                <span className="font-medium text-3xl">
                  {formatMoney(data.currentBalance)}
                </span>
              </span>
            </div>

            <div className="flex gap-4 flex-col px-4 pt-4">
              <WiseInput label="Wallet ID" {...form.register("id")} disabled />
              <WiseInput label="Wallet name" {...form.register("name")} />
              <WiseInput
                label="Initial balance"
                {...form.register("initBalance")}
              />
            </div>
          </div>
        </WiseSheetContent>
      </Sheet>
    </Form>
  );
};
