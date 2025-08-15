"use client";
import { DashboardInfo } from "@/app/api/dashboard/route";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { client, QueryKeys } from "@/lib/configs";
import { formatMoney } from "@/lib/helpers";
import { ResponsePagination } from "@/lib/types/app.type";
import { FilterTrans } from "@/modules/dashboard/components/filter/trans.filter";
import { CardStats } from "@/modules/dashboard/components/stats.card";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, WalletMinimal } from "lucide-react";

export const HeaderDashboard = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.getReport],
    queryFn: () => {
      return client
        .get("dashboard")
        .json<ResponsePagination<DashboardInfo>>()
        .then((x) => x.data);
    },
  });

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
          title="Total Income"
          icon={<WalletMinimal />}
          value={formatMoney(data?.income ?? 0)}
          desc="Total income of all wallets in this month"
        />
        <CardStats
          title="Income"
          icon={<TrendingUp className="text-green-500" />}
          value={formatMoney(data?.income ?? 0)}
          desc="Total income of all wallets in this month"
        />
        <CardStats
          title="Expense"
          icon={<TrendingDown className="text-red-500" />}
          value={formatMoney(data?.expense ?? 0)}
          desc="Total expense of all wallets in this month"
        />
      </div>
    </div>
  );
};
