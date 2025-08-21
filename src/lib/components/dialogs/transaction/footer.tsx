import { dialogs, useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const FooterDialogTransaction = () => {
  const { data } = useDialog("trans");

  return (
    <>
      <WiseButton
        size={"sm"}
        variant={"outline"}
        onClick={() => dialogs.close("trans")}
      >
        Cancel
      </WiseButton>

      <WiseButton size={"sm"}>{data?.id ? "Update" : "Create"}</WiseButton>
    </>
  );
};
