import { AddressObject, simpleParser } from "mailparser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function b64urlToBuffer(input: unknown) {
  if (typeof input !== "string")
    throw new Error("raw_base64url must be a string");
  const s = input.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - (s.length % 4)) % 4;
  return Buffer.from(s + "=".repeat(pad), "base64");
}

export const parseMail = async (raw: string) => {
  const mail = await simpleParser(b64urlToBuffer(raw));
  return mail;
};

export const getMail = (address?: AddressObject | AddressObject[]) => {
  if (!address) return "";
  if (Array.isArray(address)) {
    return address[0]?.value[0]?.address || address[0]?.text || "";
  }
  return address.value[0]?.address || address.text || "";
};
