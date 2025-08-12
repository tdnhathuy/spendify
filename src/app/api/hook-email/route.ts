import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // tránh Edge
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const EXPECTED = process.env.WEBHOOK_TOKEN ?? "";
  const auth = (req.headers.get("authorization") || "").replace(
    /^Bearer\s+/i,
    ""
  );
  if (EXPECTED && auth !== EXPECTED)
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );

  try {
    const { message_id, raw_base64url, headers, body, transport } =
      await req.json();

    if (raw_base64url) {
      const b64 = String(raw_base64url).replace(/-/g, "+").replace(/_/g, "/");
      const buf = Buffer.from(b64, "base64");
      const mail = await (await import("mailparser")).simpleParser(buf);
      const textLike = mail.text || String(mail.html || "");
      const tx = extractTransaction(textLike) as any;
      if (tx)
        await upsertTransaction({
          ...tx,
          externalId: `gmail:${message_id || mail.messageId}`,
        });
      return NextResponse.json({ ok: true });
    }

    if (transport === "gmailapp_basic" && headers && body) {
      const textLike = body.text || body.html || "";
      const tx = extractTransaction(textLike) as any;
      if (tx)
        await upsertTransaction({ ...tx, externalId: `gmail:${message_id}` });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: "Payload không hợp lệ" },
      { status: 400 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// copy 2 hàm dưới từ Cách A
function extractTransaction(text: string) {
  /* ...y hệt... */
}
async function upsertTransaction(_tx: any) {
  return;
}
