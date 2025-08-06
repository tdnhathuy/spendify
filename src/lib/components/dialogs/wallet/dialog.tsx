import { Dialog, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutateCreateWallet } from "@/lib/api/app.mutate";
import {
  closeDialog,
  useStoreDialog,
} from "@/lib/components/dialogs/dialog.store";
import { InputWalletType } from "@/lib/components/dialogs/wallet/inputs/wallet-type.input";
import {
  resolverWallet,
  TypeSchemaWallet,
} from "@/lib/components/dialogs/wallet/schema";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { LabelBlock } from "@/lib/components/shared/label-block";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { useForm } from "react-hook-form";

export const DialogWallet = () => {
  const { type, data } = useStoreDialog();

  const title = data === null ? "New Wallet" : "Edit Transaction";

  const form = useForm<TypeSchemaWallet>({
    resolver: resolverWallet,
  });

  const { mutateAsync: createWallet } = useMutateCreateWallet();

  const onSubmit = () => {
    const { icon, name, initBalance, type } = form.getValues();
    createWallet(
      {
        idIcon: icon,
        name,
        type: type,
        initBalance: Number(initBalance),
      },
      { onSettled: () => closeDialog() }
    );
  };

  return (
    <Form {...form}>
      <Dialog
        open={type === "wallet"}
        onOpenChange={() => {
          closeDialog(true);
          //   form.reset({ icon: "", name: "", initBalance: "", type: "Cash" });
        }}
      >
        <WiseDialogContent title={title}>
          <div className="flex gap-4 items-center  ">
            <span className="bg-gray-100 w-fit p-2 size-14 flex rounded-2xl">
              <IconPicker
                size="lg"
                icon={null}
                onChange={(icon) => form.setValue("icon", icon.id)}
              />
            </span>

            <LabelBlock label="Name" className="flex flex-1">
              <Input
                className=""
                autoComplete="off"
                {...form.register("name")}
              />
            </LabelBlock>
          </div>

          <LabelBlock label="Init Balance" className="flex flex-1">
            <Input
              className=""
              autoComplete="off"
              {...form.register("initBalance")}
            />
          </LabelBlock>

          <InputWalletType />

          <DialogFooter>
            <DialogClose asChild>
              <WiseButton className="w-24" variant="outline">
                Cancel
              </WiseButton>
            </DialogClose>
            <WiseButton className="w-24" onClick={() => onSubmit()}>
              Save
            </WiseButton>
          </DialogFooter>
        </WiseDialogContent>
      </Dialog>
    </Form>
  );
};
