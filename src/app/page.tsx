"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button
          onClick={() =>
            signIn("google", { callbackUrl: "/dashboard", redirect: false }).then(
              (res) => {
                if (res?.error) {
                  alert(`Đăng nhập thất bại: ${res.error}`);
                } else if (res?.url) {
                  window.location.href = res.url;
                }
              }
            )
          }
        >
          Sign in with Google
        </button>
      </main>
    </div>
  );
}
