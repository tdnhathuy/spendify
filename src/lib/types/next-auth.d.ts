import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// 1) Mở rộng interface Session của next-auth
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      /** accessToken do bạn thêm vào trong callback */
      accessToken?: string;
    };
  }

  // 2) (Tuỳ chọn) Nếu bạn muốn lưu luôn trong User object
  interface User extends DefaultUser {
    accessToken?: string;
  }
}

// 3) Mở rộng interface JWT để TS biết token.accessToken tồn tại
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
  }
}
