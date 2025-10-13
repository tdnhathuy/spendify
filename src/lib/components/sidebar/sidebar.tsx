"use client";

import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { SidebarButton } from "@/lib/components/sidebar/sidebar.button";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
  Tags,
  WalletMinimal,
} from "lucide-react";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar className="bg-black p-2" collapsible="icon">
      <SidebarContent className=" p-2 gap-2 bg-foreground rounded-lg h-full">
        <SidebarButton
          href={"/dashboard"}
          icon={<LayoutDashboard />}
          label="Dashboard"
        />

        <SidebarButton
          href={"/wallet"}
          icon={<WalletMinimal />}
          label="Wallets"
        />

        <SidebarButton href={"/category"} icon={<Tags />} label="Categories" />

        <SidebarButton
          href={"/profile"}
          icon={<CircleUserRound />}
          label="Profile"
        />

        <SidebarButton
          href={"/config-sync"}
          icon={<CircleUserRound />}
          label="Config Sync"
        />

        <SidebarButton href={"/icon"} icon={<CircleUserRound />} label="Icon" />

        <SidebarButton
          href={"/debug"}
          icon={<CircleUserRound />}
          label="Debug"
        />
      </SidebarContent>

      <Button
        onClick={toggleSidebar}
        className="absolute -right-2 bottom-12 rounded-full bg-foreground border-2 border-focus shadow hover:bg-focus"
        size={"icon"}
      >
        <ChevronRight
          className={cn("w-4 h-4 text-white", open && "rotate-180")}
        />
      </Button>
    </Sidebar>
  );
}
