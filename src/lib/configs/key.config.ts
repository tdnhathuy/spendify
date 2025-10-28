export const QueryKeys = {
  getWallet: "getWallet",
  getIcon: "getIcon",
  getTrans: "getTrans",
  getCategory: "getCategory",
  infiniteTrans: "infiniteTrans",
  getReport: "getReport",
  getWalletDetail: "getWalletDetail",
  getConfigSync: "getConfigSync",
};

export const MutationKeys = {
  getWallet: "getWallet",
  createWallet: "createWallet",
  updateWallet: "updateWallet",
  deleteWallet: "deleteWallet",
  setupUser: "setupUser",
  createTransaction: "createTransaction",
  assignCategory: "assignCategory",
  assignWallet: "assignWallet",
  deleteTransaction: "deleteTransaction",
  createConfigSync: "createConfigSync",
  createTransfer: "createTransfer",
  markTransfer: "markTransfer",
  updateConfigSync: "updateConfigSync",
  unmarkTransfer: "unmarkTransfer",
  createCategory: "createCategory",
  updateCategoryParent: "updateCategoryParent",
  splitTransaction: "splitTransaction",
  toggleNeedSplit: "toggleNeedSplit",
  getBalanceWallet: "getBalanceWallet",
} as const;

export type MutationKeysType = (typeof MutationKeys)[keyof typeof MutationKeys];
