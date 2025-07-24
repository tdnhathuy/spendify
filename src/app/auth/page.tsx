"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (res?.error) {
        console.error("Sign in error", res.error);
        alert(`Đăng nhập thất bại: ${res.error}`);
      } else if (res?.url) {
        router.push(res.url);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <button disabled={loading} onClick={handleLogin}>
        {loading ? "Đang đăng nhập..." : "Sign in with Google"}
      </button>
    </section>
  );
}
