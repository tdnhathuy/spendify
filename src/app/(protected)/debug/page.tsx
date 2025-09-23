import { WiseButton } from "@/lib/components";
import { Page } from "@/lib/components/shared/page";
import { getWallet } from "@/server";

export default function DebugPage() {
  const handleGetWallet = async () => {
    "use server";
    const result = await getWallet({
      includeTransactions: true,
      walletId: "12",
    });
    console.log("Wallet result:", result);
  };

  return (
    <Page title={"Debug"}>
      <WiseButton onClick={handleGetWallet}>Get list Transaction</WiseButton>
    </Page>
  );
}
