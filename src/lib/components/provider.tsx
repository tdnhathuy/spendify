"use client";

import { queryClient } from "@/lib/configs";
import { QueryClientProvider } from "@tanstack/react-query";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
