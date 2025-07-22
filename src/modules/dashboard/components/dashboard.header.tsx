import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { FilterTrans } from "@/modules/dashboard/components/filter/trans.filter";
import { CardStats } from "@/modules/dashboard/components/stats.card";
import { TrendingDown, TrendingUp, WalletMinimal } from "lucide-react";

export const HeaderDashboard = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <WiseButton className="w-fit" size="sm">
            Filter
          </WiseButton>
        </PopoverTrigger>
        <FilterTrans />
      </Popover>

      <div className="flex w-full h-fit gap-4">
        <CardStats
          title="Total Balance"
          icon={<WalletMinimal />}
          value="1000"
          desc="Total balance of all wallets"
        />
        <CardStats
          title="Income"
          icon={<TrendingUp className="text-green-500" />}
          value="1000"
          desc="Total balance of all wallets"
        />
        <CardStats
          title="Expense"
          icon={<TrendingDown className="text-red-500" />}
          value="1000"
          desc="Total balance of all wallets"
        />
      </div>
    </div>
  );
};
