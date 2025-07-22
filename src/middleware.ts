// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!auth|api|favicon.ico|_next/static|_next/image|assets|public).*)",
  ],
};

export default auth((req) => {
  const url = req.nextUrl.clone();

  if (!req.auth && url.pathname !== "/auth") {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  if (req.auth && url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});
