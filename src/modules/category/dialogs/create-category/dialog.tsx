import { Dialog } from "@/components/ui/dialog";
import { dialogs, useDialog, WiseDialogContent } from "@/lib/components";
import { FooterDialogCreateCategory } from "./footer";

export const DialogCreateCategory = () => {
  const { isOpen } = useDialog("create-category");
  console.log("isOpen", isOpen);
  return (
    <Dialog open={isOpen} onOpenChange={() => dialogs.close("create-category")}>
      <WiseDialogContent
        title="Create Category"
        footer={<FooterDialogCreateCategory />}
      >
        DialogCreateCategory
      </WiseDialogContent>
    </Dialog>
  );
};
