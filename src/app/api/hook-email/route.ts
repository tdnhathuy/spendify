// app/api/hook-email/route.ts
import { prisma } from "@/lib/server";
import dayjs from "dayjs";
import { simpleParser } from "mailparser";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Decode base64url -> Buffer (có bổ sung padding)
function b64urlToBuffer(input: unknown) {
  if (typeof input !== "string")
    throw new Error("raw_base64url must be a string");
  const s = input.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - (s.length % 4)) % 4;
  return Buffer.from(s + "=".repeat(pad), "base64");
}

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

  const {
    message_id,
    raw_base64url,
    transport,
    headers,
    body: basicBody,
  } = body;

  try {
    // 1) Nhánh chuẩn: có raw_base64url (Apps Script dùng format:'raw')
    if (typeof raw_base64url === "string" && raw_base64url.length > 0) {
      const buf = b64urlToBuffer(raw_base64url);
      const mail = await simpleParser(buf);
      const { from, date = "" } = mail;
      const textLike = mail.text || String(mail.html || "");

      const amount = extractAmountVND(textLike);

      const email = "tdn.huyz@gmail.com";

      const userId = await prisma.user.findUniqueOrThrow({
        where: { email },
        select: { id: true },
      });

      const NAMES: Record<string, string> = {
        "VCBDigibank@info.vietcombank.com.vn": "VCB",
        "tpbank@tpb.com.vn": "TPB",
        "HSBC Vietnam": "HSBC",
      };

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
          user: { connect: { id: userId.id } },
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

    // 2) Fallback: payload “gmailapp_basic” (không có raw)
    if (transport === "gmailapp_basic" && basicBody) {
      const textLike = basicBody.text || basicBody.html || "";
      const amount = extractAmountVND(textLike);
      return NextResponse.json({
        ok: true,
        via: "gmailapp_basic",
        messageId: message_id,
        subject: headers?.subject,
        from: headers?.from,
        amount,
      });
    }

    // 3) Thiếu dữ liệu
    console.error("hook-email bad payload", {
      hasRaw: typeof raw_base64url,
      transport,
      keys: Object.keys(body || {}),
    });
    return NextResponse.json(
      { ok: false, error: "Missing raw_base64url or unsupported payload" },
      { status: 400 }
    );
  } catch (e: any) {
    console.error("hook-email error", e?.message || e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
