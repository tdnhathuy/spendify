"use client";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutateUpdateConfigSync } from "@/lib/api/app.mutate";
import { useQueryConfigSync, useQueryWallet } from "@/lib/api/app.query";
import { dialogs, PopoverContentConfigSync } from "@/lib/components/dialogs";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { Page } from "@/lib/components/shared/page";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const PageConfigSync = () => {
  const { data = [] } = useQueryConfigSync();

  const { data: wallets = [] } = useQueryWallet();
  const { mutateAsync: updateConfigSync } = useMutateUpdateConfigSync();

  return (
    <Page
      title="Config Sync"
      headerProps={{
        rightComponent: (
          <WiseButton
            size={"sm"}
            onClick={() => dialogs.open("create-config-sync")}
          >
            Add
          </WiseButton>
        ),
      }}
    >
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
                <Popover>
                  <PopoverTrigger asChild className="cursor-pointer">
                    {item.wallet ? (
                      <div className="flex items-center gap-2 text-sm font-semibold justify-center">
                        <IconPicker
                          icon={item.wallet?.icon}
                          disabled
                          size={"sm"}
                        />
                        <span>{item.wallet?.name}</span>
                      </div>
                    ) : (
                      <span>No Config</span>
                    )}
                  </PopoverTrigger>

                  <PopoverContentConfigSync
                    wallets={wallets ?? []}
                    onSelectWallet={async (wallet) => {
                      console.log("wallet", wallet);
                      await updateConfigSync({
                        id: item.id,
                        walletId: wallet.id,
                      });
                    }}
                  />
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Page>
  );
};
