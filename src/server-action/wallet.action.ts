"use server";

import { DTOWallet } from "@/lib/dto";
import { isNotNull } from "@/lib/helpers";
import { getAuthenticatedUser, prisma, selectWallet } from "@/server";

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
  amount: number;
}
export async function adjustBalance(params: ParamsAdjustBalance) {
  const { idUser } = await getAuthenticatedUser();
  console.log("params", params);
}
