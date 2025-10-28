"use client";
import { client, QueryKeys } from "@/lib/configs";
import { formatMoney } from "@/lib/helpers";
import { ResponsePagination } from "@/lib/types/app.type";
import { CardStats } from "@/modules/dashboard/components/stats.card";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, WalletMinimal } from "lucide-react";

export const HeaderDashboard = () => {
  const { data } = useQuery({
    queryKey: [QueryKeys.getReport],
    queryFn: () => {
      return client
        .get("dashboard")
        .json<ResponsePagination<any>>()
        .then((x) => x.data);
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full h-fit gap-2">
        <CardStats
          title="Balance"
          icon={<WalletMinimal />}
          value={formatMoney(data?.income ?? 0)}
        />
        <CardStats
          title="Income"
          icon={<TrendingUp className="text-green-500" />}
          value={formatMoney(data?.income ?? 0)}
        />
        <CardStats
          title="Expense"
          icon={<TrendingDown className="text-red-500" />}
          value={formatMoney(data?.expense ?? 0)}
        />
      </div>
    </div>
  );
};
