import { SidebarFooter } from "@/components/ui/sidebar";
import { DialogLogout } from "@/lib/components/dialogs/logout.dialog";
import { SidebarButton } from "@/lib/components/sidebar/sidebar.button";
import { WiseDialog } from "@/lib/components/wise/wise-dialog";
import { LogOutIcon } from "lucide-react";

export const AppSidebarFooter = () => {
  return (
    <SidebarFooter className="">
      <WiseDialog content={<DialogLogout />}>
        <SidebarButton icon={<LogOutIcon />} label="Sign Out" />
      </WiseDialog>
    </SidebarFooter>
  );
};
