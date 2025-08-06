import { WalletType } from "@/generated/prisma";
import { TypeSchemaWallet } from "@/lib/components/dialogs/wallet/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { Bitcoin, CreditCard, Wallet } from "lucide-react";
import { useController } from "react-hook-form";

const TYPES = [
  { id: WalletType.Cash, icon: <Wallet /> },
  { id: WalletType.Debit, icon: <CreditCard /> },
  { id: WalletType.Credit, icon: <CreditCard /> },
  { id: WalletType.Crypto, icon: <Bitcoin /> },
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
            className="flex flex-1 h-12 gap-1 items-center"
            variant={isActive ? "default" : "outline"}
            onClick={() => field.onChange(type.id)}
          >
            {type.icon}
            <div>{type.id}</div>
          </WiseButton>
        );
      })}
    </div>
  );
};
