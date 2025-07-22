// middleware.ts
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    // "/((?!auth|api|favicon.ico|_next/static|_next/image|assets|public).*)",
    "/((?!auth|favicon.ico|_next/static|_next/image|assets|public).*)",
  ],
};

export default auth(async (request) => {
  const url = request.nextUrl.clone();

  if (!request.auth && url.pathname !== "/auth") {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  if (request.auth && url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (request.auth && url.pathname.startsWith("/api")) {
    const session = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    console.log("session", session);
    request.headers.set("abc", "123");
  }

  return NextResponse.next({ request });
});
