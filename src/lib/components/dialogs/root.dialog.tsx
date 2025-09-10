"use client";

import { DialogAdjustBalance } from "@/lib/components/dialogs/adjust-balance/dialog";
import { DialogCreateCategory } from "@/modules/category/dialogs/create-category/dialog";
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
      <DialogAdjustBalance />

      <DialogCreateCategory />
    </>
  );
};
