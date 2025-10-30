"use client";

import { useQueryTransaction } from "@/lib/api/app.query";
import { useStoreDashboard } from "@/modules/dashboard/pages/dashboard.store";
import { formatDate } from "date-fns";
import { useMemo } from "react";

export const useListTrans = () => {
  const { filter } = useStoreDashboard();
  const { data = [], isLoading } = useQueryTransaction(filter);

  const groupedByDate = useMemo(() => {
    if (data.length === 0) return [];
    const groupMap = new Map<string, typeof data>();
    for (const item of data) {
      const dateKey = formatDate(item.date, "dd/MM/yyyy");
      const group = groupMap.get(dateKey);

      if (group) {
        group.push(item);
      } else {
        groupMap.set(dateKey, [item]);
      }
    }

    const groups = Array.from(groupMap.entries()).map(
      ([dateKey, transactions]) => {
        transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
        return {
          date: dateKey,
          dateTimestamp: transactions[0].date.getTime(), // Cache timestamp for sorting
          transactions,
        };
      }
    );

    groups.sort((a, b) => b.dateTimestamp - a.dateTimestamp);

    return groups;
  }, [data]);

  return { data: groupedByDate, isLoading };
};
