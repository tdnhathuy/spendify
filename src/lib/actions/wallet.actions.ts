"use server";

import { DTOWallet } from "@/lib/dto";
import { isNotNull } from "@/lib/helpers";
import { prisma, selectWallet } from "@/server";

export async function getWallets() {
  try {
    const wallets = await prisma.wallet.findMany({
      orderBy: { createdAt: "desc" },
      select: selectWallet,
    });

    return wallets.map(DTOWallet.fromDB).filter(isNotNull);
  } catch (error) {
    console.error("Error fetching wallets:", error);
    return [];
  }
}
