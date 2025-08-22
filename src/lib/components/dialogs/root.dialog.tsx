import { DialogAssignCategory } from "@/lib/components/dialogs/assign-category/dialog";
import { DialogAssignWallet } from "@/lib/components/dialogs/assign-wallet/dialog";
import { DialogCreateWallet } from "@/lib/components/dialogs/create-wallet/dialog";
import { DialogTrans } from "@/lib/components/dialogs/transaction";
import { DialogWallet } from "@/lib/components/dialogs/wallet/dialog";

export const RootDialog = () => {
  return (
    <>
      <DialogAssignCategory />
      <DialogAssignWallet />
      <DialogTrans />
      <DialogWallet />
      <DialogCreateWallet />
    </>
  );
};
