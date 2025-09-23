import { useQueryWallet } from "@/lib/api/app.query";
import { IWallet } from "@/lib/types";
import { WiseTag } from "@/lib/components/wise/wise-tag";
import { useDidUpdate } from "rooks";
import useArray from "use-array-state";

export const TransactionFilter = () => {
  const { data: wallets = [] } = useQueryWallet();
  const [array, controls] = useArray<IWallet>([]);

  const onClick = (wallet: IWallet) => {
    const idx = array.findIndex((item) => item.id === wallet.id);
    if (idx !== -1) controls.remove(idx);
    else controls.insert(0, wallet);
  };

  useDidUpdate(() => {}, [array]);

  return (
    <div className="flex gap-2">
      {wallets.map((wallet) => {
        const isSelected = array.includes(wallet);
        return (
          <WiseTag
            key={wallet.id}
            icon={wallet.icon}
            title={wallet.name}
            variant={isSelected ? "date" : "wallet"}
            onClick={() => onClick(wallet)}
          />
        );
      })}
    </div>
  );
};
