import { WalletType } from "@/generated/prisma";
import { TypeSchemaCreateWallet } from "@/lib/components/dialogs/create-wallet/inputs/schema";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { useController } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { WrapperInput } from "@/lib/components/dialogs/create-wallet/dialog";
import { CiCreditCard1 } from "react-icons/ci";

const TYPEs: WalletType[] = ["Cash", "Credit", "Debit", "Crypto"];

export const InputWalletType = () => {
  const { field } = useController<TypeSchemaCreateWallet>({ name: "type" });
  const isShowCardInfo = field.value === "Credit" || field.value === "Debit";

  return (
    <div className="flex gap-3 flex-col">
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
      {isShowCardInfo && (
        <div className="grid grid-cols-2 gap-3">
          <WrapperInput icon={<CiCreditCard1 />} label="Card Number">
            <Input />
          </WrapperInput>
          <WrapperInput icon={<CiCreditCard1 />} label="Card Password">
            <Input />
          </WrapperInput>
        </div>
      )}
    </div>
  );
};
