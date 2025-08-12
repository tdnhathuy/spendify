// middleware.ts
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!auth|api/auth|favicon.ico|_next/static|_next/image|assets|public).*)",
    "/api/:path*",
  ],
};

export default auth(async (request) => {
  const url = request.nextUrl.clone();
  console.log("url", url);

  // Skip NextAuth own routes completely
  if (
    url.pathname.startsWith("/api/auth") ||
    url.pathname.startsWith("/api/hook")
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

  // -------------- API ROUTES -------------
  // Các API riêng của app phải có token, nếu không 401
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET!,
  });

  console.log("-------token-----------\n", token);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  request.headers.set("x-user-email", String(token.email ?? ""));
  request.headers.set("x-user-token", String(token.accessToken ?? ""));

  return NextResponse.next({ request });
});
