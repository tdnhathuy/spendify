"use client";

import { client } from "@/lib/configs";
import { ConfigTable } from "@/modules/config-sync/components/config-table";
import { useQuery } from "@tanstack/react-query";

export const PageConfigSync = () => {
  const { data } = useQuery({
    queryKey: ["config"],
    queryFn: () => client.get("config-sync").json(),
  });
  console.log("data", data);
  return <ConfigTable />;
};
