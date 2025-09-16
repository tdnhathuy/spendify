import { createDefaultCategory } from "@/app/api/setup/misc";
import { WiseButton } from "@/lib/components";
import { DTOWallet } from "@/lib/dto";
import { prisma, selectTrans, selectWallet } from "@/lib/server";
import { getAllAmountTransferByWalletId } from "@/lib/server/service.server";

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

async function createCategories() {
  "use server";
  const email = "tdn.huyz@gmail.com";
  const { id: idUser } = await prisma.user.findFirstOrThrow({
    where: { email },
    select: { id: true },
  });

  await prisma.category.deleteMany({ where: { idUser } });
  await createDefaultCategory(idUser);
}

async function debugWallet() {
  "use server";
  const email = "tdn.huyz@gmail.com";
  const { id: idUser } = await prisma.user.findFirstOrThrow({
    where: { email },
    select: { id: true },
  });

  const wallet = await prisma.wallet.findFirstOrThrow({
    where: { idUser, name: "Cash" },
    select: selectWallet,
  });

  const trans = await prisma.transaction.findMany({
    where: {
      idUser,
    },
    select: selectTrans,
  });

  // console.log("trans", trans);
  // console.log("wallet", wallet);

  const am = await getAllAmountTransferByWalletId(wallet.id);
  // console.log("result", result);
}

async function getWalletInfo() {
  "use server";
  const email = "tdn.huyz@gmail.com";
  const { id: idUser } = await prisma.user.findFirstOrThrow({
    where: { email },
    select: { id: true },
  });

  const wallet = await prisma.wallet.findUnique({
    where: { id: "82ece73c-b1a0-49c8-a4e3-9e1f59e64f7e" },
    select: selectWallet,
  });

  console.log("wallet", wallet);
}

export const UpdateTransactionButton = () => {
  return (
    <>
      {/* <form action={updateRandomTransaction}>
        <WiseButton type="submit">Update Transaction</WiseButton>
      </form>
      <form action={createWallets}>
        <WiseButton type="submit">Create Wallets</WiseButton>
      </form>
      <form action={createCategories}>
        <WiseButton type="submit">Create Categories</WiseButton>
      </form>

      <form action={debugWallet}>
        <WiseButton type="submit">Debug Wallet</WiseButton>
      </form> */}

      <form action={getWalletInfo}>
        <WiseButton type="submit">Get Wallet Info</WiseButton>
      </form>
    </>
  );
};
