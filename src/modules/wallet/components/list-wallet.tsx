import { useQueryWallet } from "@/lib/api/app.query";
import { LabelBlock } from "@/lib/components";
import { IWallet } from "@/lib/types";
import { WalletItem } from "@/modules/wallet/components/wallet-item";

interface Props {
  className?: string;
  onClick?: (wallet: IWallet) => void;
}

export const ListWallet = (props: Props) => {
  const { onClick } = props;

  const { data: listWallet = [] } = useQueryWallet();

  const listIncludeInReport = listWallet.filter(
    (wallet) => wallet.includeInReport
  );
  const listNotIncludeInReport = listWallet.filter(
    (wallet) => !wallet.includeInReport
  );

  return (
    <div className="flex flex-col gap-4">
      <LabelBlock label="Include in Report">
        <Wrapper>
          {listIncludeInReport.map((wallet) => {
            return (
              <WalletItem
                key={wallet.id}
                wallet={wallet}
                {...(onClick ? { onClick } : {})}
              />
            );
          })}
        </Wrapper>
      </LabelBlock>

      <LabelBlock label="Not Include in Report">
        <Wrapper>
          {listNotIncludeInReport.map((wallet) => {
            return (
              <WalletItem
                key={wallet.id}
                wallet={wallet}
                {...(onClick ? { onClick } : {})}
              />
            );
          })}
        </Wrapper>
      </LabelBlock>
    </div>
  );
};

const Wrapper = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
      {children}
    </div>
  );
};
