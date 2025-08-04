"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { DialogTrans } from "@/lib/components/dialogs/transaction/dialog";
import { queryClient } from "@/lib/configs";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <DialogTrans />
      </SessionProvider>
    </QueryClientProvider>
  );
};
