import { prisma } from "@/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const {
    idWallet = null,
    idCategory = null,
    email = "",
    note = "",
    amount = 0,
  } = await request.json();

  if (!email || !amount)
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  const { id: idUser } = await prisma.user.findFirstOrThrow({
    where: { email },
    select: { id: true },
  });

  await prisma.transaction.create({
    data: {
      amount,
      note,
      idWallet,
      idUser,
      idCategory,
    },
  });

  return NextResponse.json({ message: "Transaction created" });
};
