import { auth } from "@/auth";
import { getSession } from "next-auth/react";

let cachedSession: Awaited<ReturnType<typeof getSession>> | null = null;
let cacheTime = 0;
const CACHE_DURATION = 2 * 60 * 1000; // 2 phút

export async function getCachedSession() {
  const now = Date.now();
  if (!cachedSession || now - cacheTime > CACHE_DURATION) {
    cachedSession =
      typeof window === "undefined" ? await auth() : await getSession();
    cacheTime = now;
  }
  return cachedSession;
}
