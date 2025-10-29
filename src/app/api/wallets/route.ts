import { prisma } from "@/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = request.nextUrl.searchParams.get("email")!;

  if (!email) NextResponse.json({ data: [] });

  const wallets = await prisma.wallet.findMany({
    where: { user: { email } },
    select: { id: true, name: true },
  });

  return NextResponse.json({
    data: wallets,
    text: JSON.stringify(wallets),
  });
};
