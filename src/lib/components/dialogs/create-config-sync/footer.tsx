import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const FooterDialogCreateConfigSync = () => {
  return (
    <>
      <WiseButton
        size="sm"
        variant={"outline"}
        onClick={() => dialogs.close("create-config-sync")}
      >
        Cancel
      </WiseButton>
      <WiseButton size="sm">Create</WiseButton>
    </>
  );
};
