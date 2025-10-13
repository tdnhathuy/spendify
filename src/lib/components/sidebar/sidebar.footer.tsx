import { SidebarFooter } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { BsArrowsExpand } from "react-icons/bs";
import { GrUserSettings } from "react-icons/gr";

export const AppSidebarFooter = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <SidebarFooter className="">
      <WiseButton
        className="flex justify-start gap-2 bg-transparent text-white hover:bg-focus h-fit"
        asChild
      >
        <div className="px-4 justify-end w-full gap-4 flex items-center">
          <GrUserSettings />

          <span className="flex flex-col text-sm text-left gap-0 flex-1 font-medium ">
            <span>Account</span>
            <span>{user.name}</span>
          </span>

          <BsArrowsExpand />
        </div>
      </WiseButton>
      {/* <WiseDialog content={<DialogLogout />}> */}
      {/* <SidebarButton icon={<LogOutIcon />} label="Sign Out" /> */}
      {/* </WiseDialog> */}
    </SidebarFooter>
  );
};
