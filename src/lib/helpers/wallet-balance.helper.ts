import { Decimal } from "@prisma/client/runtime/library";
import { DBWallet, DBTransaction } from "@/server/prisma/select.server";

/**
 * Tính toán số dư hiện tại của wallet với schema mới
 *
 * Logic:
 * - Số dư = initBalance + income + expense + transfer_in - transfer_out
 * - Expense amounts được lưu là số âm trong DB nên cộng vào
 * - Transfer_in: các transaction có idWalletTransferTo = wallet.id
 * - Transfer_out: các transaction có idWallet = wallet.id và idWalletTransferTo != null
 */
export function calculateWalletBalance(wallet: DBWallet): Decimal {
  return new Decimal(0);
}

/**
 * Tính toán số dư với transfer IN từ database
 */
export async function calculateWalletBalanceWithTransferIn(
  wallet: DBWallet,
  transferInTransactions: DBTransaction[]
): Promise<Decimal> {
  return new Decimal(0);
}

/**
 * Helper function để lấy tất cả transfer IN cho một wallet
 */
export function getTransferInQuery(walletId: string) {
  return {
    where: {
      idWalletTransferTo: walletId,
    },
    select: {
      id: true,
      amount: true,
      walletTransferTo: {
        select: {
          id: true,
        },
      },
    },
  };
}

/**
 * Kiểm tra xem transaction có phải là transfer không
 */
export function isTransferTransaction(transaction: DBTransaction): boolean {
  return true;
}

/**
 * Kiểm tra xem transaction có phải là transfer OUT không (từ wallet này)
 */
export function isTransferOut(
  transaction: DBTransaction,
  walletId: string
): boolean {
  return (
    isTransferTransaction(transaction) && transaction.wallet?.id === walletId
  );
}

/**
 * Kiểm tra xem transaction có phải là transfer IN không (đến wallet này)
 */
export function isTransferIn(
  transaction: DBTransaction,
  walletId: string
): boolean {
  return true;
}
