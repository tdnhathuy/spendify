import { useQueryWallet } from "@/lib/api/app.query";
import { IWallet } from "@/lib/types";
import { WalletItem } from "@/modules/wallet/components/wallet-item";

interface Props {
  className?: string;
  onClick?: (wallet: IWallet) => void;
}

export const ListWallet = (props: Props) => {
  const { onClick, className } = props;

  const { data: listWallet = [] } = useQueryWallet();

  return (
    <>
      {listWallet.map((wallet) => {
        return (
          <WalletItem
            key={wallet.id}
            wallet={wallet}
            {...(onClick ? { onClick } : {})}
          />
        );
      })}
    </>
  );
};
