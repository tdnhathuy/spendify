import { WiseButton } from "@/lib/components";
import { prisma } from "@/lib/server";

async function updateRandomTransaction() {
  "use server";
  const { id } = await prisma.user.findFirstOrThrow({ select: { id: true } });
}

async function createWallets() {
  "use server";

  const email = "tdn.huyz@gmail.com";
  const { id: idUser } = await prisma.user.findFirstOrThrow({
    where: { email },
    select: { id: true },
  });

  await prisma.wallet.createMany({
    data: [
      { name: "Cash", initBalance: 0, type: "Cash", idUser },
      { name: "VCB", initBalance: 0, type: "Debit", idUser },
      { name: "MoMo", initBalance: 0, type: "Debit", idUser },

      {
        name: "SC",
        initBalance: 0,
        type: "Credit",
        idUser,
        includeInReport: false,
      },
      {
        name: "HSBC",
        initBalance: 0,
        type: "Credit",
        idUser,
        includeInReport: false,
      },

      {
        name: "Binance",
        initBalance: 0,
        type: "Crypto",
        idUser,
        includeInReport: false,
      },
    ],
  });
}

export const UpdateTransactionButton = () => {
  return (
    <>
      <form action={updateRandomTransaction}>
        <WiseButton type="submit">Update Transaction</WiseButton>
      </form>
      <form action={createWallets}>
        <WiseButton type="submit">Create Wallets</WiseButton>
      </form>
    </>
  );
};
