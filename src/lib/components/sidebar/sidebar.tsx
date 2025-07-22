"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarButton } from "@/lib/components/sidebar/sidebar.button";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
  Tags,
  WalletMinimal,
} from "lucide-react";
import { AppSidebarFooter, AppSidebarHeader } from "./";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar className=" sticky top-0 right-0 text-white" collapsible="icon">
      <AppSidebarHeader />

      <SidebarContent className="bg-sidebar-foreground">
        <SidebarGroup className="gap-2">
          <SidebarButton
            href={"/dashboard"}
            icon={<LayoutDashboard />}
            label="Dashboard"
          />

          <SidebarButton href={"/"} icon={<WalletMinimal />} label="Wallets" />

          <SidebarButton href={"/"} icon={<Tags />} label="Categories" />

          <SidebarButton
            href={"/"}
            icon={<CircleUserRound />}
            label="Profile"
          />
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />

      <Button
        onClick={toggleSidebar}
        className="absolute -right-4 bottom-12 rounded-full bg-foreground border-2 shadow hover:bg-white/80"
        size={"icon"}
      >
        <ChevronRight
          className={cn("w-4 h-4 text-black", open && "rotate-180")}
        />
      </Button>
    </Sidebar>
  );
}
