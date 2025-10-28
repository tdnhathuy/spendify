import { useQueryWallet } from "@/lib/api/app.query";
import { formatMoney } from "@/lib/helpers";
import { IWallet } from "@/lib/types";
import { WalletItem } from "@/modules/wallet/components/wallet-item";

interface Props {
  className?: string;
}

export const ListWallet = (props: Props) => {
  const { data: listWallet = [] } = useQueryWallet();

  const listIncludeInReport = listWallet.filter(
    (wallet) => wallet.includeInReport
  );
  const listNotIncludeInReport = listWallet.filter(
    (wallet) => !wallet.includeInReport
  );

  const currentBalance = listIncludeInReport.reduce(
    (acc, wallet) => acc + wallet.currentBalance,
    0
  );
  const currentBalanceNotIncludeInReport = listNotIncludeInReport.reduce(
    (acc, wallet) => acc + wallet.currentBalance,
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <List
        label={`Include in Report - ${formatMoney(currentBalance)} VND`}
        wallets={listIncludeInReport}
      />

      <List
        label={`Not Include in Report - ${formatMoney(currentBalanceNotIncludeInReport)} VND`}
        wallets={listNotIncludeInReport}
      />
    </div>
  );
};

const List = (props: { wallets: IWallet[]; label: string }) => {
  const { wallets, label } = props;

  if (!wallets.length) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold">{label}</span>

      <div className="grid grid-cols-1 xxs:grid-cols-2  xl:grid-cols-3 gap-2 w-full">
        {wallets.map((wallet) => {
          return <WalletItem key={wallet.id} wallet={wallet} />;
        })}
      </div>
    </div>
  );
};
