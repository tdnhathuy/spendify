import { ParsedMail } from "mailparser";
import { NextResponse } from "next/server";
import { prisma, Prompt } from "@/lib/server";
import dayjs from "dayjs";
import { z } from "zod";

// Bank name mapping
const BANK_NAMES: Record<string, string> = {
  "VCBDigibank@info.vietcombank.com.vn": "VCB",
  "tpbank@tpb.com.vn": "TPB",
  "HSBC Vietnam": "HSBC",
};

// Schema definitions
const EmailSchema = z.object({
  providerMsgId: z.string().min(1, "Message ID is required"),
  idUser: z.string().min(1, "User ID is required"),
  mail: z.object({
    from: z.any().refine(val => val !== undefined, "Sender information is required"),
    date: z.any().refine(val => val !== undefined, "Date is required"),
    subject: z.any().optional(),
    html: z.any().optional(),
    to: z.any().optional(),
  }),
  syncConfig: z.array(
    z.object({
      fromEmail: z.string(),
      walletId: z.string().nullable(),
    })
  ),
});

// Result type for better error handling
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string; status?: number };

// Helper to extract email address
export const extractEmailAddress = (emailField: any): string => {
  if (!emailField) return "";
  
  try {
    if (emailField.value && Array.isArray(emailField.value) && emailField.value.length > 0) {
      return emailField.value[0].address || "";
    }
  } catch (error) {
    console.error("Error extracting email address:", error);
  }
  
  return "";
};

// Check if transaction already exists
export const checkTransactionExists = async (
  providerMsgId: string,
  idUser: string
): Promise<Result<boolean>> => {
  // Validate inputs
  const validationResult = z.object({
    providerMsgId: z.string().min(1),
    idUser: z.string().min(1),
  }).safeParse({ providerMsgId, idUser });

  if (!validationResult.success) {
    return { 
      success: false, 
      error: "Validation error: Missing required fields",
      status: 400
    };
  }

  try {
    const isCreated = await prisma.transactionInfoSync.findFirst({
      where: { providerMsgId, idUser },
    });

    return { success: true, data: !!isCreated };
  } catch (error: any) {
    return { 
      success: false, 
      error: `Database error: ${error.message || "Unknown error"}`,
      status: 500
    };
  }
};

// Get user information by email
export const getUserByEmail = async (email: string): Promise<Result<any>> => {
  // Validate email
  const validationResult = z.string().email().safeParse(email);
  
  if (!validationResult.success) {
    return { 
      success: false, 
      error: "Invalid email address", 
      status: 400 
    };
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
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
    
    return { success: true, data: user };
  } catch (error: any) {
    return { 
      success: false, 
      error: `User not found: ${error.message || "Unknown error"}`,
      status: 404
    };
  }
};

// Process email and create transaction
export const processEmailAndCreateTransaction = async (params: {
  idUser: string;
  syncConfig: {
    fromEmail: string;
    walletId: string | null;
  }[];
  providerMsgId: string;
  mail: ParsedMail;
}): Promise<NextResponse> => {
  // Validate inputs using Zod
  const validationResult = EmailSchema.safeParse(params);
  
  if (!validationResult.success) {
    const errorFormat = validationResult.error.format();
    return NextResponse.json(
      { ok: false, error: "Validation error", details: errorFormat },
      { status: 400 }
    );
  }

  const { idUser, syncConfig, providerMsgId, mail } = params;
  const { from, date, subject, html, to } = mail;

  // Extract email addresses
  const emailFrom = extractEmailAddress(from);
  const emailTo = extractEmailAddress(to);

  if (!emailFrom) {
    return NextResponse.json(
      { ok: false, error: "Could not extract sender email" },
      { status: 400 }
    );
  }

  // Find matching wallet configuration
  const walletConfig = syncConfig.find(
    (item) => item.fromEmail === emailFrom
  );

  if (!walletConfig) {
    return NextResponse.json(
      { ok: false, error: `No wallet configured for email: ${emailFrom}` },
      { status: 400 }
    );
  }

  const walletId = walletConfig.walletId;
  
  // Get bank name
  const name = from?.value[0]?.name || from?.value[0]?.address || "";
  const bankName = BANK_NAMES[name] || name;
  
  // Validate date
  const dateObj = new Date(date || "");
  if (isNaN(dateObj.getTime())) {
    return NextResponse.json(
      { ok: false, error: "Invalid date format in email" },
      { status: 400 }
    );
  }
  
  const dateStr = dayjs(date).format("DD/MM/YYYY");
  const note = `Sync transaction ${dateStr} from ${bankName}`;

  try {
    // Extract amount
    const amount = await Prompt.extractAmount(String(html || ""));
    if (amount === null) {
      return NextResponse.json(
        { ok: false, error: "Could not extract transaction amount from email" },
        { status: 400 }
      );
    }

    // Create transaction in database
    await prisma.transaction.create({
      data: {
        amount: amount,
        note,
        date: dateObj,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: { connect: { id: idUser } },
        ...(walletId && { wallet: { connect: { id: walletId } } }),

        infoSync: {
          create: {
            emailProvider: emailFrom,
            emailReceived: emailTo || "",
            emailTitle: subject || "",
            idUser: idUser,
            providerMsgId: providerMsgId,
          },
        },
      },
    });

    // Return success response
    return NextResponse.json({
      ok: true,
      via: "gmail_raw",
      messageId: providerMsgId,
      subject: mail.subject,
      from: mail.from?.text,
      amount,
    });
  } catch (error: any) {
    console.error("Failed to create transaction:", error);
    return NextResponse.json(
      { ok: false, error: `Database error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
};