import { WiseSheetFooter } from "@/lib/components/wise/wise-sheet-content";

export const FooterSheetWalletDetail = () => {
  return (
    <WiseSheetFooter
      buttons={[
        {
          label: "Transactions",
          variant: "default",
          className: "flex-1",
        },
        {
          label: "Adjust Balance",
          variant: "outline",
          className: "flex-1",
        },
      ]}
    />
  );
};
