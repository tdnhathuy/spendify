import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryWallet } from "@/lib/api/app.query";
import { WiseIcon } from "@/lib/components/wise/wise-icon";
import { formatMoney } from "@/lib/helpers";

interface Props {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  excludeWallets?: string[];
}

export const InputWalletSelector = (props: Props) => {
  const {
    onValueChange = () => {},
    value = "",
    disabled = false,
    excludeWallets = [],
  } = props;

  const { data: wallets = [] } = useQueryWallet();
  const filteredWallets = wallets.filter(
    (wallet) => !excludeWallets.includes(wallet.id)
  );

  const currentWallet = wallets.find((wallet) => wallet.id === value);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a wallet">
          <WiseIcon icon={currentWallet?.icon} size={16} />
          <span className="flex  items-center gap-2">
            <span>{currentWallet?.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatMoney(currentWallet?.currentBalance)}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <div>
          {filteredWallets.map((wallet) => {
            return (
              <SelectItem key={wallet.id} value={wallet.id}>
                <WiseIcon icon={wallet.icon} size={16} />
                <span className="flex flex-col justify-start items-start">
                  <span>{wallet.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatMoney(wallet.currentBalance)}
                  </span>
                </span>
              </SelectItem>
            );
          })}
        </div>
      </SelectContent>
    </Select>
  );
};
