"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { DialogTrans } from "@/lib/components/dialogs/transaction/dialog";
import { queryClient } from "@/lib/configs";
import { DialogWallet } from "@/lib/components/dialogs/wallet/dialog";
import { DialogAssignCategory } from "@/lib/components/dialogs/assign-category/dialog";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <DialogTrans />
        <DialogWallet />
        <DialogAssignCategory />
      </SessionProvider>
    </QueryClientProvider>
  );
};
