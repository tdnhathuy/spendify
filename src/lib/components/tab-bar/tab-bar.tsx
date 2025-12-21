"use client";

import { configTabBar } from "@/lib/components/tab-bar/config";
import { PopoverTabBar } from "@/lib/components/tab-bar/tab-bar.popover";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabBar = () => {
  const pathName = usePathname();

  return (
    <nav className="fixed bottom-0 bg-primary shadow-2xl  left-0 right-0 p-2 border-t lg:hidden flex gap-2 justify-center items-center">
      {configTabBar.map((feature) => {
        const { href, icon, title } = feature;
        const isActive = pathName.includes(href);
        return (
          <Link href={href} key={href} className="flex flex-1">
            <WiseButton className="bg-transparent hover:bg-transparent flex flex-col h-fit flex-1 gap-2 text-white">
              <span className="size-6 flex justify-center items-center">
                {icon(isActive)}
              </span>
              <span className={cn(isActive ? "text-white" : "text-gray-400")}>
                {title}
              </span>
            </WiseButton>
          </Link>
        );
      })}
      <PopoverTabBar />
    </nav>
  );
};
