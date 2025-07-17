"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { AppSidebarFooter, AppSidebarHeader } from "./";

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();
  console.log("open", open);

  return (
    <Sidebar className="relative text-white" collapsible="icon">
      <AppSidebarHeader />

      <SidebarContent className="bg-sidebar-foreground">
        <SidebarGroup />
        <SidebarGroup />
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
