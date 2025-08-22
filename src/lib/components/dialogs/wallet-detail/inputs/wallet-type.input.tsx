import { WalletType } from "@/generated/prisma";
import { TypeSchemaWallet } from "@/lib/components/dialogs/wallet-detail/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WalletIcon } from "@/modules/wallet/components/wallet-item";
import { useController } from "react-hook-form";

const TYPES = [
  { id: WalletType.Cash },
  { id: WalletType.Debit },
  { id: WalletType.Credit },
  { id: WalletType.Crypto },
];

export const InputWalletType = () => {
  const { field } = useController<TypeSchemaWallet>({ name: "type" });
  return (
    <div className="flex gap-2">
      {TYPES.map((type) => {
        const isActive = type.id === field.value;
        return (
          <WiseButton
            key={type.id}
            className="flex flex-1 h-12 gap-2 items-center "
            variant={isActive ? "default" : "outline"}
            onClick={() => field.onChange(type.id)}
          >
            {WalletIcon[type.id]({ color: isActive ? "white" : "black" })}
            <div>{type.id}</div>
          </WiseButton>
        );
      })}
    </div>
  );
};
