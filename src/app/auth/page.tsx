"use client";
import { signIn } from "next-auth/react";

export default function () {
  return (
    <section>
      <form action={async () => await signIn("google")}>
        <button type="submit">Signin with Google</button>
      </form>
    </section>
  );
}
