import { useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const FooterDialogCreateIcon = () => {
  return (
    <>
      <WiseButton>Cancel</WiseButton>
      <WiseButton>Create</WiseButton>
    </>
  );
};
