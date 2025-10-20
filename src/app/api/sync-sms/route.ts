import { createApi, responseSuccess } from "@/server";
import { createSyncTransaction } from "@/server-action";
import { NextResponse } from "next/server";

//https://app.spendify.asia/api/sync-sms
//https://https://down-eleven-maryland-improving.trycloudflare.com/api/sync-sms

interface PayloadSyncSMS {
  email: string;
  walletId: string;
  categoryId: string;
  note: string;
}
export const POST = createApi(async ({ request }) => {
  const { note, email, walletId, categoryId } =
    (await request.json()) as PayloadSyncSMS;

  const RE = /(\d{1,3}(?:[., ]\d{3})+|\d+)(?=\s*(?:VND|VNĐ|₫|đ)\b)/iu;

  const m = RE.exec(note);
  const amount = m ? Number(m[1].replace(/[.,\s]/g, "")) : 0;

  if (!amount)
    return NextResponse.json({ message: "Invalid amount" }, { status: 400 });

  await createSyncTransaction({
    email,
    amount,
    date: new Date(),
    walletId,
    categoryId,
    note,
  });

  return responseSuccess(true);
});
