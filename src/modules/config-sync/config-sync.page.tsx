"use client";

import { ServiceConfigSync } from "@/lib/services/config-sync.service";
import { ConfigTable } from "@/modules/config-sync/components/config-table";
import { useQuery } from "@tanstack/react-query";

export const PageConfigSync = () => {
  const { data = [] } = useQuery({
    queryKey: ["config"],
    queryFn: ServiceConfigSync.get,
  });

  return (
    <div>
      <ConfigTable />
    </div>
  );
};
