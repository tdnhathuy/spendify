"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarButton } from "@/lib/components/sidebar/sidebar.button";
import { AppSidebarFooter } from "@/lib/components/sidebar/sidebar.footer";
import {
  ChartArea,
  CircleUserRound,
  LayoutDashboard,
  MessageCircle,
  Tags,
  WalletMinimal,
} from "lucide-react";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar className="bg-black p-4" collapsible="icon">
      <SidebarContent className=" p-2 gap-2 bg-foreground rounded-lg h-full">
        <SidebarGroup className="flex flex-1 gap-1">
          <SidebarButton
            href={"/dashboard"}
            icon={<LayoutDashboard />}
            label="Dashboard"
          />

          <SidebarButton href={"/chat"} icon={<MessageCircle />} label="Chat" />

          <SidebarButton
            href={"/wallet"}
            icon={<WalletMinimal />}
            label="Wallets"
          />

          <SidebarButton
            href={"/category"}
            icon={<Tags />}
            label="Categories"
          />

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

          <SidebarButton
            href={"/icon"}
            icon={<CircleUserRound />}
            label="Icon"
          />

          <SidebarButton
            href={"/debug"}
            icon={<CircleUserRound />}
            label="Debug"
          />
        </SidebarGroup>

        <AppSidebarFooter />
      </SidebarContent>

      {/* <Button
        onClick={toggleSidebar}
        className="absolute -right-2 bottom-12 rounded-full bg-foreground border-2 border-focus shadow hover:bg-focus"
        size={"icon"}
      >
        <ChevronRight
          className={cn("w-4 h-4 text-white", open && "rotate-180")}
        />
      </Button> */}
    </Sidebar>
  );
}
