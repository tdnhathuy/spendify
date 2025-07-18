import { DialogClose } from "@/components/ui/dialog";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";
import { signOut } from "next-auth/react";

export const DialogLogout = () => {
  return (
    <WiseDialogContent
      title="Sign Out"
      footer={
        <div className="flex flex-row gap-2">
          <DialogClose asChild>
            <WiseButton variant="outline">Cancel</WiseButton>
          </DialogClose>

          <DialogClose asChild>
            <WiseButton
              variant="destructive"
              onClick={() => signOut({ redirectTo: "/" })}
            >
              Logout
            </WiseButton>
          </DialogClose>
        </div>
      }
    >
      <span>Are you sure you want to sign out?</span>
    </WiseDialogContent>
  );
};
