"use client";

import { useMutateToasty } from "@/hooks/use-query-toast";
import { useMutateWallet } from "@/lib/api/app.mutate";
import { WiseButton } from "@/lib/components";
import { Page } from "@/lib/components/shared/page";

export const DebugToasty = () => {
  const autoWallet = useMutateToasty(useMutateWallet);

  return (
    <Page title={"Toasty"}>
      <WiseButton
        onClick={autoWallet.asyncToast}
        disabled={autoWallet.isPending}
      >
        {autoWallet.isPending ? "Đang xử lý..." : "Fetch Wallet (Auto)"}
      </WiseButton>
    </Page>
  );
};
