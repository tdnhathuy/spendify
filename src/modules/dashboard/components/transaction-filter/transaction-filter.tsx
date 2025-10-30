"use client";
import { useQueryWallet } from "@/lib/api/app.query";
import { WiseTag } from "@/lib/components/wise/wise-tag";
import { IWallet } from "@/lib/types";
import { useStoreDashboard } from "@/modules/dashboard/pages/dashboard.store";

export const TransactionFilter = () => {
  const { filter, setFilter } = useStoreDashboard();
  const { data: wallets = [] } = useQueryWallet();

  const onClick = (wallet: IWallet) => {
    if (filter.walletIds.includes(wallet.id)) {
      setFilter({
        ...filter,
        walletIds: filter.walletIds.filter((id) => id !== wallet.id),
      });
    } else {
      setFilter({ ...filter, walletIds: [...filter.walletIds, wallet.id] });
    }
  };

  return (
    <div className="flex gap-2 mt-2 w-full  flex-wrap">
      {wallets.map((wallet) => {
        const isSelected = filter.walletIds.includes(wallet.id);
        return (
          <WiseTag
            key={wallet.id}
            icon={wallet.icon}
            title={wallet.name}
            variant={isSelected ? "date" : "wallet"}
            onClick={() => onClick(wallet)}
            className="select-none"
          />
        );
      })}
    </div>
  );
};
