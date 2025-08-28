import {
  DialogAssignCategory,
  DialogAssignWallet,
  DialogCreateConfigSync,
  DialogCreateTrans,
  DialogCreateWallet,
  DialogTrans,
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
    </>
  );
};
