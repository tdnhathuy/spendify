"use client";

import { RootDialog } from "@/lib/components/dialogs/root.dialog";
import { queryClient } from "@/lib/configs";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
        <RootDialog />
      </SessionProvider>
    </QueryClientProvider>
  );
};
