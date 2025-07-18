"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight, HomeIcon } from "lucide-react";
import { AppSidebarFooter, AppSidebarHeader } from "./";
import { SidebarButton } from "@/lib/components/sidebar/sidebar.button";
import Link from "next/link";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar className=" sticky top-0 right-0 text-white" collapsible="icon">
      <AppSidebarHeader />

      <SidebarContent className="bg-sidebar-foreground">
        <SidebarGroup className="gap-2">
          <Link href={"/"}>
            <SidebarButton icon={<HomeIcon />} label="Homepage" />
          </Link>
          <Link href={"/files"}>
            <SidebarButton icon={<HomeIcon />} label="Files" />
          </Link>
          <Link href={"debug"}>
            <SidebarButton icon={<HomeIcon />} label="Debug" />
          </Link>

          <Link href={"/transactions"}>
            <SidebarButton icon={<HomeIcon />} label="Transactions" />
          </Link>
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />

      <Button
        onClick={toggleSidebar}
        className="absolute -right-4 bottom-12 rounded-full bg-white shadow hover:bg-white/80"
        size={"icon"}
      >
        <ChevronRight
          className={cn("w-4 h-4 text-black", open && "rotate-180")}
        />
      </Button>
    </Sidebar>
  );
}
