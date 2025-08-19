"use client";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { client } from "@/lib/configs";

export default function DebugPage() {
  return (
    <form>
      <WiseButton
        onClick={(e) => {
          e.preventDefault();
          client.post("sync/mail");
        }}
      >
        Crawl Mail
      </WiseButton>
    </form>
  );
}
