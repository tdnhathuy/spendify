"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { PageHeader } from "@/lib/components/shared/page-header";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { ServiceConfigSync } from "@/lib/services/config-sync.service";
import { useQuery } from "@tanstack/react-query";

export const PageConfigSync = () => {
  const { data = [] } = useQuery({
    queryKey: ["config"],
    queryFn: ServiceConfigSync.get,
  });

  return (
    <div>
      {/* <ConfigTable /> */}
      <PageHeader
        title="Config Sync"
        // description="Config Sync"
        rightComponent={<WiseButton size={"sm"}>Add</WiseButton>}
      />

      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableHead className="w-[50%] text-center">Email</TableHead>
            <TableHead className="w-[50%] text-center">Wallet</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[50%] text-center">
                {item.fromEmail}
              </TableCell>
              <TableCell className="w-[50%] text-center">
                <div className="flex items-center gap-2 text-sm font-semibold justify-center">
                  <IconPicker icon={item.wallet.icon} disabled size={"sm"} />
                  <span>{item.wallet.name}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
