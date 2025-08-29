import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FooterDialogCreateIcon } from "@/lib/components/dialogs/create-icon/footer";
import { useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseDialogContent } from "@/lib/components/wise/wise-dialog";

export const DialogCreateIcon = () => {
  const { isOpen } = useDialog("create-icon");
  return (
    <Dialog modal open={isOpen}>
      <WiseDialogContent
        title="Create Icon"
        footer={<FooterDialogCreateIcon />}
      >
        <div className="flex flex-col gap-4">
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Description" />
        </div>
      </WiseDialogContent>
    </Dialog>
  );
};
