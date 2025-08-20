"use client";

import { openDialog } from "@/lib/components/dialogs";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabBar = () => {
  const pathName = usePathname();

  const isDashboard = pathName === "/dashboard";
  return (
    <nav className="fixed bottom-0 bg-white shadow-2xl left-0 right-0 p-2 border-t lg:hidden flex gap-2 justify-center items-center">
      <Link href={"/dashboard"}>
        <WiseButton>
          <span>DashBoard</span>
        </WiseButton>
      </Link>

      <Link href={"/wallet"}>
        <WiseButton>
          <span>DashBoard</span>
        </WiseButton>
      </Link>

      {isDashboard && (
        <WiseButton
          className="size-8 text-xs"
          variant={"outline"}
          size={"icon"}
          onClick={() => openDialog("trans", null)}
        >
          <Plus />
        </WiseButton>
      )}
    </nav>
  );
};
