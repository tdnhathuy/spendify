import { DialogAssignCategory } from "@/lib/components/dialogs/assign-category/dialog";
import { DialogAssignWallet } from "@/lib/components/dialogs/assign-wallet/dialog";
import { DialogTrans } from "@/lib/components/dialogs/transaction";
import { DialogWallet } from "@/modules/wallet/components/wallet-dialog/dialog";

export const RootDialog = () => {
  return (
    <>
      <DialogAssignCategory />
      <DialogAssignWallet />
      <DialogTrans />
      <DialogWallet />
    </>
  );
};
