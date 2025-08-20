"use client";

import { configTabBar } from "@/lib/components/tab-bar/config";
import { PopoverTabBar } from "@/lib/components/tab-bar/tab-bar.popover";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabBar = () => {
  const pathName = usePathname();

  return (
    <nav className="fixed bottom-0 bg-white shadow-2xl  left-0 right-0 p-2 border-t lg:hidden flex gap-2 justify-center items-center">
      {configTabBar.map((feature) => {
        const { href, icon, title } = feature;
        const isActive = pathName.includes(href);
        return (
          <Link href={href} key={href} className="flex flex-1">
            <WiseButton
              className="flex flex-col gap-1 h-fit flex-1"
              variant={isActive ? "default" : "outline"}
            >
              {icon}
              <span>{title}</span>
            </WiseButton>
          </Link>
        );
      })}
      <PopoverTabBar />
    </nav>
  );
};
