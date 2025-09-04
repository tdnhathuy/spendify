import {
  checkIsTransCreated,
  createSyncInfo,
  getUserInfo,
} from "@/app/api/hook-email/misc";
import { parseMail } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

      const email = "tdn.huyz@gmail.com";
      const { id, syncConfig } = await getUserInfo(email);

      await checkIsTransCreated(message_id || mail.messageId, id);
      return await createSyncInfo({
        idUser: id,
        syncConfig,
        providerMsgId: message_id || mail.messageId,
        mail,
      });
    }
  } catch (e: any) {
    console.error("hook-email error", e?.message || e);
    return NextResponse.json(
      { ok: false, message: e?.message || e },
      { status: 500 }
    );
  }
}
