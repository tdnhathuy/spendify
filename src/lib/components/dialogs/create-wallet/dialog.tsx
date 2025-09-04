import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FooterDialogCreateWallet } from "@/lib/components/dialogs/create-wallet/footer";
import {
  resolverCreateWallet as resolver,
  TypeSchemaCreateWallet,
} from "@/lib/components/dialogs/create-wallet/schema";
import { InputWalletType } from "@/lib/components/dialogs/create-wallet/inputs/wallet-type.input";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { WiseTextInput } from "@/lib/components/wise/wise-text-input";
import { useForm } from "react-hook-form";
import { CiCreditCard1 } from "react-icons/ci";
import { IoWalletOutline } from "react-icons/io5";
import { PiMoney } from "react-icons/pi";
import { useDidUpdate } from "rooks";
import { Switch } from "@/components/ui/switch";

export const DialogCreateWallet = () => {
  const { isOpen, data } = dialogs.useDialog("create-wallet");

  const form = useForm<TypeSchemaCreateWallet>({ resolver });

  const title = data ? "Edit Wallet" : "Create Wallet";
  const subtitle = data ? "Edit your wallet" : "Add a new account";

  useDidUpdate(() => {
    if (isOpen) {
      form.reset({
        icon: data?.icon ?? null,
        initBalance: data?.initBalance?.toString() ?? "",
        name: data?.name ?? "",
        type: data?.type || "Cash",
        includeInReport: data?.includeInReport || false,
      });
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => dialogs.close("create-wallet", true)}
    >
      <Form {...form}>
        <WiseDialogContent
          title={title}
          desc={subtitle}
          footer={<FooterDialogCreateWallet />}
          className="gap-4 py-8 "
          ctnClassName="-translate-y-[60%]"
          footerProps={{
            className: "flex flex-row  gap-2  w-full justify-between",
          }}
        >
          <span className="mx-auto bg-gray-100 flex  justify-center items-center p-3 rounded-md border shadow">
            <IconPicker
              size="lg"
              icon={form.watch("icon")}
              onChange={(icon) => form.setValue("icon", icon)}
            />
          </span>

          <WrapperInput icon={<IoWalletOutline />} label="Wallet Name">
            <WiseTextInput
              placeholder="Enter wallet name"
              {...form.register("name")}
            />
          </WrapperInput>

          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <WrapperInput icon={<PiMoney />} label="Initial Balance">
              <WiseTextInput
                placeholder="Enter initial balance"
                {...form.register("initBalance")}
              />
            </WrapperInput>

            <WrapperInput icon={<PiMoney />} label="Include in Report">
              <div className="flex items-center gap-2 h-full justify-center">
                <Switch
                  checked={form.watch("includeInReport") ?? false}
                  onCheckedChange={(checked) =>
                    form.setValue("includeInReport", checked)
                  }
                />
              </div>
            </WrapperInput>
          </div>

          <WrapperInput icon={<CiCreditCard1 />} label="Wallet Type">
            <InputWalletType />
          </WrapperInput>
        </WiseDialogContent>
      </Form>
    </Dialog>
  );
};

interface PropsWrapperInput {
  children: React.ReactNode;
  icon: React.ReactElement;
  label: string;
}

export const WrapperInput = (props: PropsWrapperInput) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="flex items-center gap-2 text-sm font-semibold">
        <span className="flex size-6 rounded-sm bg-gray-100 justify-center items-center text-base">
          {props.icon}
        </span>

        <span>{props.label}</span>
      </span>

      {props.children}
    </div>
  );
};
