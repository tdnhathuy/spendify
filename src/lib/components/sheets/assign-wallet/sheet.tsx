import { Sheet } from "@/components/ui/sheet";
import { useQueryWallet } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { sheets, useSheet } from "@/lib/components/sheets/sheet.store";
import { WiseIcon } from "@/lib/components/wise/wise-icon";
import {
  WiseSheetContent,
  WiseSheetFooter,
} from "@/lib/components/wise/wise-sheet-content";

export const SheetAssignWallet = () => {
  const { sheetProps, data } = useSheet("assign-wallet");

  const { data: wallets = [] } = useQueryWallet();

  return (
    <Sheet {...sheetProps}>
      <WiseSheetContent
        title={"Assign Wallet"}
        // loading={isLoading}
        className="p-8 gap-4"
        footer={<FooterAssignWallet />}
      >
        <ul className="space-y-2">
          {wallets.map((wallet) => {
            return (
              <li
                key={wallet.id}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-sm bg-foreground"
                onClick={() => {
                  sheets.close("assign-wallet");
                  data?.onSelectWallet?.(wallet);
                }}
              >
                <WiseIcon icon={wallet.icon} size="sm" />
                <span>{wallet.name}</span>
              </li>
            );
          })}
        </ul>
      </WiseSheetContent>
    </Sheet>
  );
};

const FooterAssignWallet = () => {
  return (
    <WiseSheetFooter
      buttons={[
        { label: "Back", onClick: () => sheets.close("assign-wallet") },
      ]}
    />
  );
};
