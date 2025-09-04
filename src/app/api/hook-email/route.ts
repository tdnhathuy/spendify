import { parseMail } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";
import {
  checkTransactionExists,
  getUserByEmail,
  processEmailAndCreateTransaction,
} from "@/lib/services/email-processor.service";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Request validation schema
const RequestSchema = z.object({
  message_id: z.string().optional(),
  raw_base64url: z.string().min(1, "Email content is required"),
});

export async function POST(req: NextRequest) {
  // Parse and validate request body
  let body: any;
  try {
    body = await req.json();

    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      const errorFormat = validation.error.format();
      return NextResponse.json(
        { ok: false, error: "Validation error", details: errorFormat },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const { message_id, raw_base64url } = body;

  try {
    // Parse email from base64 content
    const mail = await parseMail(raw_base64url);
    if (!mail) {
      return NextResponse.json(
        { ok: false, error: "Failed to parse email content" },
        { status: 400 }
      );
    }

    // TODO: Replace with environment variable or configuration
    const email = "tdn.huyz@gmail.com";

    // Get user information
    const userResult = await getUserByEmail(email);
    if (!userResult.success) {
      return NextResponse.json(
        { ok: false, error: userResult.error },
        { status: userResult.status || 500 }
      );
    }

    const { id, syncConfig } = userResult.data;

    // Use message_id from request or fallback to mail.messageId
    const providerMsgId = message_id || mail.messageId;
    if (!providerMsgId) {
      return NextResponse.json(
        { ok: false, error: "Missing message ID" },
        { status: 400 }
      );
    }

    // Check if transaction already exists
    const transactionResult = await checkTransactionExists(providerMsgId, id);
    if (!transactionResult.success) {
      return NextResponse.json(
        { ok: false, error: transactionResult.error },
        { status: transactionResult.status || 500 }
      );
    }

    if (transactionResult.data) {
      return NextResponse.json(
        { ok: false, error: "Transaction already created" },
        { status: 409 } // Conflict status code
      );
    }

    // Process email and create transaction
    return await processEmailAndCreateTransaction({
      idUser: id,
      syncConfig,
      providerMsgId,
      mail,
    });
  } catch (error: any) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
