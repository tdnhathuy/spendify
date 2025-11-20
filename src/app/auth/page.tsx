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
      
      console.log("res", res);

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
    <section className="flex w-screen h-screen justify-center items-center bg-gradient-to-br from-white to-violet-700 flex-col gap-10">
      <span className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Spendly Wise</h1>
        <h2 className="text-2xl">Smart spending, wise decisions</h2>
      </span>

      <div className="flex bg-white p-4 px-8 rounded-sm shadow flex-col  gap-4">
        <span className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <h2 className="text-sm">Sign in to your Spendly Wise account</h2>
        </span>

        <button
          disabled={loading}
          onClick={handleLogin}
          className="bg-violet-700 text-white px-4 py-2 rounded-md w-full cursor-pointer"
        >
          {loading ? "Đang đăng nhập..." : "Sign in with Google"}
        </button>

        <span className="text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <span className="text-violet-700">Terms of Service</span> and{" "}
          <span className="text-violet-700">Privacy Policy</span>
        </span>
      </div>
    </section>
  );
}
