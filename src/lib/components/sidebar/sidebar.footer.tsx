import { SidebarFooter } from "@/components/ui/sidebar";
import { SidebarButton } from "@/lib/components/sidebar/sidebar.button";

export const AppSidebarFooter = () => {
  return (
    <SidebarFooter className="bg-sidebar-foreground">
      <SidebarButton label="Sign Out" />
    </SidebarFooter>
  );
};
