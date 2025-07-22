import { CardStats } from "@/modules/dashboard/components/stats.card";
import { TrendingDown, TrendingUp, WalletMinimal } from "lucide-react";

export const HeaderDashboard = () => {
  return (
    <div className="flex  w-full h-fit gap-4">
      <CardStats
        title="Total Balance"
        icon={<WalletMinimal />}
        value="1000"
        desc="Total balance of all wallets"
      />
      <CardStats
        title="Income"
        icon={<TrendingUp />}
        value="1000"
        desc="Total balance of all wallets"
      />
      <CardStats
        title="Expense"
        icon={<TrendingDown />}
        value="1000"
        desc="Total balance of all wallets"
      />
    </div>
  );
};
