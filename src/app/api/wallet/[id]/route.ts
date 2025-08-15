import { createApi, responseSuccess } from "@/lib/server";
import { prisma } from "@/lib/server/prisma.server";
import { PayloadCreateWallet } from "@/lib/services";

export const PUT = createApi(async ({ request }) => {
  const id = request.nextUrl.pathname.split("/").pop();

  const payload: PayloadCreateWallet = await request.json();
  await prisma.wallet.update({
    where: { id: id! },
    data: {
      name: payload.name,
      idIcon: payload.idIcon || null,
      type: payload.type,
      initBalance: payload.initBalance,
    },
  });
  return responseSuccess([]);
});
