import { Sheet } from "@/components/ui/sheet";
import { useQueryWallet } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { FooterCategoryDetail } from "@/lib/components/sheets/category-detail/footer";
import { sheets, useSheet } from "@/lib/components/sheets/sheet.store";
import {
  WiseSheetContent,
  WiseSheetFooter,
} from "@/lib/components/wise/wise-sheet-content";
import { useQuery } from "@tanstack/react-query";

export const SheetAssignWallet = () => {
  const { sheetProps, data } = useSheet("assign-wallet");

  const { data: wallets = [] } = useQueryWallet();
  console.log("wallets", wallets);

  return (
    <Sheet {...sheetProps}>
      <WiseSheetContent
        title={"Assign Wallet"}
        // loading={isLoading}
        className="p-8 gap-4"
        footer={<FooterAssignWallet />}
      >
        <div>
          {wallets.map((wallet) => {
            return (
              <button key={wallet.id} className="flex items-center gap-2">
                <IconPicker icon={wallet.icon}  />
                <span>{wallet.name}</span>
              </button>
            );
          })}
        </div>
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
