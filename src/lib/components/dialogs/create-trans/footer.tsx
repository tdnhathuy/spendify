import { useMutateCreateTrans } from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { removeMoneyFormat } from "@/lib/helpers";

interface FooterDialogCreateTransProps {
  amount: string;
  onSuccess: () => void;
}

export const FooterDialogCreateTrans = ({
  amount,
  onSuccess,
}: FooterDialogCreateTransProps) => {
  const { mutate: createTrans, isPending } = useMutateCreateTrans();

  const onClickCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    createTrans({ amount: removeMoneyFormat(amount) });
    onSuccess();
  };

  const onClickCancel = () => {
    dialogs.close("create-trans");
  };

  return (
    <>
      <WiseButton
        disabled={isPending}
        variant={"outline"}
        size="sm"
        onClick={onClickCancel}
      >
        Cancel
      </WiseButton>

      <WiseButton
        disabled={isPending || !amount}
        variant={"default"}
        size="sm"
        onClick={onClickCreate}
      >
        Create
      </WiseButton>
    </>
  );
};
