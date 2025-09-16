import { Decimal } from '@prisma/client/runtime/library';
import { DBWallet, DBTransaction } from '@/lib/server/select.server';

/**
 * Tính toán số dư hiện tại của wallet với schema mới
 * 
 * Logic:
 * - Số dư = initBalance + income - expense + transfer_in - transfer_out
 * - Transfer_in: các transaction có idWalletTransferTo = wallet.id
 * - Transfer_out: các transaction có idWallet = wallet.id và idWalletTransferTo != null
 */
export function calculateWalletBalance(wallet: DBWallet): Decimal {
  const { initBalance, transactions } = wallet;
  
  let balance = new Decimal(initBalance);
  
  for (const transaction of transactions) {
    const amount = new Decimal(transaction.amount);
    
    // Kiểm tra nếu đây là transaction transfer
    if (transaction.walletTransferTo) {
      // Đây là transfer OUT (từ wallet này sang wallet khác)
      balance = balance.minus(amount);
    } else if (transaction.category) {
      // Đây là transaction thông thường (income/expense)
      if (transaction.category.type === 'Income') {
        balance = balance.plus(amount);
      } else if (transaction.category.type === 'Expense') {
        balance = balance.minus(amount);
      }
      // Category type 'Other' không ảnh hưởng đến balance
    }
  }
  
  // Cộng thêm các transfer IN (từ wallet khác chuyển đến wallet này)
  // Cần query riêng vì không có trong transactions của wallet hiện tại
  
  return balance;
}

/**
 * Tính toán số dư với transfer IN từ database
 */
export async function calculateWalletBalanceWithTransferIn(
  wallet: DBWallet,
  transferInTransactions: DBTransaction[]
): Promise<Decimal> {
  let balance = calculateWalletBalance(wallet);
  
  // Cộng thêm các transfer IN
  for (const transaction of transferInTransactions) {
    if (transaction.walletTransferTo?.id === wallet.id) {
      balance = balance.plus(new Decimal(transaction.amount));
    }
  }
  
  return balance;
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
  return !!transaction.walletTransferTo;
}

/**
 * Kiểm tra xem transaction có phải là transfer OUT không (từ wallet này)
 */
export function isTransferOut(transaction: DBTransaction, walletId: string): boolean {
  return isTransferTransaction(transaction) && transaction.wallet?.id === walletId;
}

/**
 * Kiểm tra xem transaction có phải là transfer IN không (đến wallet này)
 */
export function isTransferIn(transaction: DBTransaction, walletId: string): boolean {
  return isTransferTransaction(transaction) && transaction.walletTransferTo?.id === walletId;
}
