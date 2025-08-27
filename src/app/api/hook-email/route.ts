import { getMail, parseMail } from "@/lib/helpers";
import { prisma } from "@/lib/server";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractAmountVND(text: string) {
  const m = text.match(/([-+]?\d{1,3}(?:[.,]\d{3})+|\d+)\s*(vnd|vnđ|₫|đ)/i);
  return m ? parseInt(m[1].replace(/[^\d-]/g, ""), 10) : null;
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { message_id, raw_base64url } = body;

  try {
    if (typeof raw_base64url === "string" && raw_base64url.length > 0) {
      const mail = await parseMail(raw_base64url);
      console.log('mail', mail.html)
      const { from, date = "", to } = mail;
      const textLike = mail.text || String(mail.html || "");

      const amount = extractAmountVND(textLike);

      const emailFrom = getMail(from);
      const emailTo = getMail(to);

      const email = "tdn.huyz@gmail.com";

      const { id, syncConfig } = await prisma.user.findUniqueOrThrow({
        where: { email },
        select: {
          id: true,
          syncConfig: {
            select: {
              fromEmail: true,
              walletId: true,
            },
          },
        },
      });

      const NAMES: Record<string, string> = {
        "VCBDigibank@info.vietcombank.com.vn": "VCB",
        "tpbank@tpb.com.vn": "TPB",
        "HSBC Vietnam": "HSBC",
      };

      const walletId = syncConfig.find(
        (item) => item.fromEmail === emailFrom
      )?.walletId;

      const name = from?.value[0]?.name || from?.value[0]?.address || "";

      const finalName = NAMES[name] || name;
      const dateStr = dayjs(date).format("DD/MM/YYYY");

      const note = `Sync transaction ${dateStr} from ${finalName}`;
      await prisma.transaction.create({
        data: {
          amount: amount ?? 0,
          note,
          date: new Date(date),
          createdAt: new Date(),
          updatedAt: new Date(),
          user: { connect: { id } },
          ...(walletId && { wallet: { connect: { id: walletId } } }),

          infoSync: {
            create: {
              emailProvider: emailFrom,
              emailReceived: emailTo,
              emailTitle: mail.subject || "",
              idUser: id,
            },
          },
        },
      });

      return NextResponse.json({
        ok: true,
        via: "gmail_raw",
        messageId: message_id || mail.messageId,
        subject: mail.subject,
        from: mail.from?.text,
        amount,
      });
    }
  } catch (e: any) {
    console.error("hook-email error", e?.message || e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
