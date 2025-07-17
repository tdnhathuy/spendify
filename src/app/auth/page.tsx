"use client";

import { signIn } from "next-auth/react";

export default function AuthPage() {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/home" })}>
      Signin with Google
    </button>
  );
}
