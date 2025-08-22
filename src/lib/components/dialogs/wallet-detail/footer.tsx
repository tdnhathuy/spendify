import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const FooterDialogWalletDetail = () => {
  return (
    <div className="flex  gap-2 w-full">
      <WiseButton variant={"outline"} className="flex-1 flex">
        Update wallet
      </WiseButton>
      <WiseButton className="flex-1 flex">View all transactions</WiseButton>
    </div>
  );
};
