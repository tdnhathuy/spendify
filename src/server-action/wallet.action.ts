"use server";

import { DTOWallet } from "@/lib/dto";
import { isNotNull } from "@/lib/helpers";
import {
  getAuthenticatedUser,
  prisma,
  selectTrans,
  selectWallet,
} from "@/server";

export async function getWallets() {
  const { idUser } = await getAuthenticatedUser();

  const wallets = await prisma.wallet.findMany({
    where: { idUser },
    orderBy: { createdAt: "desc" },
    select: selectWallet,
  });

  return wallets.map(DTOWallet.fromDB).filter(isNotNull);
}

export interface ParamsAdjustBalance {
  idWallet: string;
  newAmount: number;
}
export async function adjustBalance(params: ParamsAdjustBalance) {
  const { idWallet, newAmount } = params;
  const { idUser } = await getAuthenticatedUser();

  const wallet = await prisma.wallet.findUniqueOrThrow({
    where: { id: idWallet, idUser },
    select: selectWallet,
  });

  const { currentBalance } = DTOWallet.fromDB(wallet)!;

  const amount = newAmount - currentBalance;

  const trans = await prisma.transaction.create({
    data: {
      amount,
      wallet: { connect: { id: idWallet } },
      user: { connect: { id: idUser } },
      adjust: {
        create: {
          reason: `Adjust Balance (${currentBalance.toLocaleString()} → ${newAmount.toLocaleString()})`,
          amount,
          idUser,
        },
      },
    },
    select: selectTrans,
  });

  return trans.id;
}
