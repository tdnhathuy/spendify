import { DTOCategory } from "@/lib/dto/category.dto";
import { DTOInfoSync } from "@/lib/dto/info-sync.dto";
import { DTOWallet } from "@/lib/dto/wallet.dto";
import { DBTransaction } from "@/lib/server";
import { ITransaction, ITransfer } from "@/lib/types";

/**
 * Xác định direction của transfer dựa trên wallet đang xem
 */
const determineTransferDirection = (
  transaction: DBTransaction,
  viewFromWalletId?: string
): "out" | "in" => {
  if (!viewFromWalletId) {
    // Nếu không có viewFromWalletId, mặc định là 'out' (vì transaction thuộc về wallet nguồn)
    return "out";
  }

  // Nếu đang xem từ wallet nguồn → 'out'
  if (transaction.wallet?.id === viewFromWalletId) {
    return "out";
  }

  // Nếu đang xem từ wallet đích → 'in'
  if (transaction.walletTransferTo?.id === viewFromWalletId) {
    return "in";
  }

  // Fallback
  return "out";
};

const fromDB = (
  transaction: DBTransaction,
  viewFromWalletId?: string
): ITransaction => {
  const category = DTOCategory.fromDB(transaction.category);
  const categoryParent = transaction.category?.parent
    ? DTOCategory.fromDB(transaction.category?.parent as any)
    : category;

  const infoSync = DTOInfoSync.fromDB(transaction.infoSync as any);
  const wallet = DTOWallet.fromDBSimple(transaction.wallet as any);

  // Tạo transfer object nếu đây là transaction transfer
  const transfer: ITransfer | null =
    transaction.walletTransferTo && transaction.wallet
      ? {
          isTransfer: true,
          walletFrom: DTOWallet.fromDBSimple(transaction.wallet),
          walletTo: DTOWallet.fromDBSimple(transaction.walletTransferTo),
          direction: determineTransferDirection(transaction, viewFromWalletId),
        }
      : null;

  const splits = transaction.splits?.length
    ? transaction.splits.map((split) => ({
        id: split.id,
        amount: split.amount.toNumber(),
        wallet: DTOWallet.fromDBSimple(split.wallet),
        note: split.note,
      }))
    : null;

  const result: ITransaction = {
    id: transaction.id,
    amount: transaction.amount.toNumber(),
    isAdjust: !!transaction.adjust,
    isNeedSplit: transaction.isNeedSplit,
    date: transaction.date,
    description: getTransferDescription(transaction),

    ...{ transfer, splits, infoSync, wallet, category, categoryParent },
  };

  return result;
};

/**
 * Kiểm tra xem transaction có phải transfer không
 */
const isTransferTransaction = (transaction: DBTransaction): boolean => {
  return !!transaction.walletTransferTo;
};

/**
 * Lấy description mặc định cho transfer transaction
 */
const getTransferDescription = (transaction: DBTransaction): string => {
  if (!isTransferTransaction(transaction)) return transaction.note || "";

  const fromWallet = transaction.wallet?.name || "Unknown Wallet";
  const toWallet = transaction.walletTransferTo?.name || "Unknown Wallet";

  return transaction.note || `Transfer from ${fromWallet} to ${toWallet}`;
};

export const DTOTrans = {
  fromDB,
  isTransferTransaction,
  getTransferDescription,
};
