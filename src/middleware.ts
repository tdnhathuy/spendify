// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!auth|api/auth|favicon.ico|_next/static|_next/image|assets|public).*)",
    "/api/:path*",
  ],
};

export default auth(async (request) => {
  const url = request.nextUrl.clone();
  // return NextResponse.next();


  // Skip NextAuth own routes completely
  if (
    url.pathname.startsWith("/api/auth") ||
    url.pathname.startsWith("/api/hook") ||
    url.pathname.startsWith("/api/sync-sms")
  ) {
    return NextResponse.next();
  }

  // -------------- PAGE ROUTES -------------
  if (!url.pathname.startsWith("/api")) {
    // Trang cần đăng nhập
    if (!request.auth && url.pathname !== "/auth") {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    // Đã đăng nhập nhưng truy cập root => chuyển thẳng dashboard
    if (request.auth && url.pathname === "/") {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  const token = request.auth!;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  request.headers.set("x-user-email", String(token.user.email ?? ""));
  request.headers.set("x-user-token", String(token.user.accessToken ?? ""));

  return NextResponse.next({ request });
});
