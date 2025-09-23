import { prisma } from '@/server/prisma/prisma.server';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Service để tính toán số dư wallet với schema mới
 */
export class WalletBalanceService {
  
  /**
   * Tính toán số dư hiện tại của một wallet
   */
  static async calculateBalance(walletId: string, userId: string): Promise<Decimal> {
    // Lấy thông tin wallet và init balance
    const wallet = await prisma.wallet.findFirstOrThrow({
      where: { id: walletId, idUser: userId },
      select: { initBalance: true }
    });
    
    let balance = new Decimal(wallet.initBalance);
    
    // 1. Cộng tất cả income
    const incomeSum = await prisma.transaction.aggregate({
      where: {
        idWallet: walletId,
        idUser: userId,
        category: {
          type: 'Income'
        }
      },
      _sum: {
        amount: true
      }
    });
    
    if (incomeSum._sum.amount) {
      balance = balance.plus(new Decimal(incomeSum._sum.amount));
    }
    
    // 2. Cộng tất cả expense (vì expense được lưu là số âm trong DB)
    const expenseSum = await prisma.transaction.aggregate({
      where: {
        idWallet: walletId,
        idUser: userId,
        category: {
          type: 'Expense'
        }
      },
      _sum: {
        amount: true
      }
    });
    
    if (expenseSum._sum.amount) {
      balance = balance.plus(new Decimal(expenseSum._sum.amount));
    }
    
    // 3. Trừ tất cả transfer OUT (từ wallet này sang wallet khác)
    const transferOutSum = await prisma.transaction.aggregate({
      where: {
        idWallet: walletId,
        idUser: userId,
        idWalletTransferTo: {
          not: null
        }
      },
      _sum: {
        amount: true
      }
    });
    
    if (transferOutSum._sum.amount) {
      balance = balance.minus(new Decimal(transferOutSum._sum.amount));
    }
    
    // 4. Cộng tất cả transfer IN (từ wallet khác chuyển đến wallet này)
    const transferInSum = await prisma.transaction.aggregate({
      where: {
        idWalletTransferTo: walletId,
        idUser: userId
      },
      _sum: {
        amount: true
      }
    });
    
    if (transferInSum._sum.amount) {
      balance = balance.plus(new Decimal(transferInSum._sum.amount));
    }
    
    // 5. Cộng tất cả split IN (split từ wallet khác đến wallet này)
    // Chỉ cộng splits nhận được, không trừ splits đi (vì transaction gốc đã tính đầy đủ)
    const splitInSum = await prisma.transactionSplit.aggregate({
      where: {
        idWallet: walletId,
        idUser: userId
      },
      _sum: {
        amount: true
      }
    });
    
    if (splitInSum._sum.amount) {
      balance = balance.plus(new Decimal(splitInSum._sum.amount));
    }
    
    return balance;
  }
  
  /**
   * Tính toán số dư cho nhiều wallet cùng lúc
   */
  static async calculateMultipleBalances(walletIds: string[], userId: string): Promise<Map<string, Decimal>> {
    const balances = new Map<string, Decimal>();
    
    // Có thể optimize bằng cách dùng raw query, nhưng để đơn giản thì dùng Promise.all
    const promises = walletIds.map(async (walletId) => {
      const balance = await this.calculateBalance(walletId, userId);
      return { walletId, balance };
    });
    
    const results = await Promise.all(promises);
    
    for (const { walletId, balance } of results) {
      balances.set(walletId, balance);
    }
    
    return balances;
  }
  
  /**
   * Lấy tổng quan về tất cả wallet của user
   */
  static async getUserWalletsOverview(userId: string) {
    const wallets = await prisma.wallet.findMany({
      where: { idUser: userId },
      select: {
        id: true,
        name: true,
        type: true,
        initBalance: true,
        includeInReport: true
      }
    });
    
    const walletIds = wallets.map(w => w.id);
    const balances = await this.calculateMultipleBalances(walletIds, userId);
    
    return wallets.map(wallet => ({
      ...wallet,
      currentBalance: balances.get(wallet.id) || new Decimal(0)
    }));
  }
}

/**
 * Raw SQL query để tính balance (performance cao hơn cho lượng data lớn)
 */
export const calculateBalanceRawSQL = `
  SELECT 
    w.id,
    w.name,
    (
      w."initBalance" + 
      COALESCE(income.total, 0) + 
      COALESCE(expense.total, 0) + 
      COALESCE(transfer_in.total, 0) - 
      COALESCE(transfer_out.total, 0) +
      COALESCE(split_in.total, 0)
    ) as balance
  FROM "Wallet" w
  LEFT JOIN (
    SELECT t."idWallet", SUM(t.amount) as total 
    FROM "Transaction" t
    INNER JOIN "Category" c ON t."idCategory" = c.id
    WHERE c.type = 'Income' AND t."idUser" = $1
    GROUP BY t."idWallet"
  ) income ON w.id = income."idWallet"
  LEFT JOIN (
    SELECT t."idWallet", SUM(t.amount) as total 
    FROM "Transaction" t
    INNER JOIN "Category" c ON t."idCategory" = c.id
    WHERE c.type = 'Expense' AND t."idUser" = $1
    GROUP BY t."idWallet"
  ) expense ON w.id = expense."idWallet"
  LEFT JOIN (
    SELECT t."idWalletTransferTo" as "idWallet", SUM(t.amount) as total 
    FROM "Transaction" t
    WHERE t."idWalletTransferTo" IS NOT NULL AND t."idUser" = $1
    GROUP BY t."idWalletTransferTo"
  ) transfer_in ON w.id = transfer_in."idWallet"
  LEFT JOIN (
    SELECT t."idWallet", SUM(t.amount) as total 
    FROM "Transaction" t
    WHERE t."idWalletTransferTo" IS NOT NULL AND t."idUser" = $1
    GROUP BY t."idWallet"
  ) transfer_out ON w.id = transfer_out."idWallet"
  LEFT JOIN (
    SELECT ts."idWallet", SUM(ts.amount) as total
    FROM "TransactionSplit" ts
    WHERE ts."idUser" = $1
    GROUP BY ts."idWallet"
  ) split_in ON w.id = split_in."idWallet"
  WHERE w."idUser" = $1
`;
