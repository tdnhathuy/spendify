import { DialogClose } from "@/components/ui/dialog";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const FooterDialogAssignWallet = () => {
  return (
    <DialogClose asChild>
      <WiseButton>Close</WiseButton>
    </DialogClose>
  );
};
