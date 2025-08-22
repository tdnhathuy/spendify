import { WalletType } from "@/generated/prisma";
import { TypeSchemaCreateWallet } from "@/lib/components/dialogs/create-wallet/inputs/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { useController } from "react-hook-form";

const TYPEs: WalletType[] = ["Cash", "Credit", "Debit", "Crypto"];

export const InputWalletType = () => {
  const { field } = useController<TypeSchemaCreateWallet>({ name: "type" });
  return (
    <ul className="flex gap-2">
      {TYPEs.map((type) => {
        const isSelected = type === field.value;
        return (
          <li className="flex flex-1 justify-center items-center " key={type}>
            <WiseButton
              onClick={() => field.onChange(type)}
              variant={isSelected ? "default" : "outline"}
              className="w-full"
            >
              {type}
            </WiseButton>
          </li>
        );
      })}
    </ul>
  );
};
