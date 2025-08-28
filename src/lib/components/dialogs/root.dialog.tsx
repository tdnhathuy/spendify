import {
  DialogAssignCategory,
  DialogAssignWallet,
  DialogCreateConfigSync,
  DialogCreateTrans,
  DialogCreateWallet,
  DialogTrans,
  DialogTransfer,
  DialogWallet,
} from "./index";

export const RootDialog = () => {
  return (
    <>
      <DialogAssignCategory />
      <DialogAssignWallet />
      <DialogTrans />
      <DialogWallet />
      <DialogCreateWallet />
      <DialogCreateTrans />
      <DialogCreateConfigSync />
      <DialogTransfer />
    </>
  );
};
