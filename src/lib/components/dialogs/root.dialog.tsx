import {
  DialogAssignCategory,
  DialogAssignWallet,
  DialogCreateConfigSync,
  DialogCreateIcon,
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
      <DialogCreateIcon />
    </>
  );
};
