import { PayloadGetTransactions } from "@/server-action";
import { create } from "zustand";

interface StoreDashboard {
  filter: PayloadGetTransactions;
}
const storeDashboard = create<StoreDashboard>(() => ({
  filter: { walletIds: [] },
}));
export const useStoreDashboard = () => {
  const filter = storeDashboard((s) => s.filter);

  const setFilter = (filter: PayloadGetTransactions) => {
    storeDashboard.setState({ filter });
  };

  return {
    filter,
    setFilter,
  };
};
