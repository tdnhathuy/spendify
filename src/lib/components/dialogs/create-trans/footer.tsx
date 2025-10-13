import { useMutateCreateTrans } from "@/lib/api/app.mutate";
import { dialogs } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { removeMoneyFormat } from "@/lib/helpers";
import { Dispatch, SetStateAction } from "react";

interface FooterDialogCreateTransProps {
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
}

export const FooterDialogCreateTrans = ({
  amount,
  setAmount,
}: FooterDialogCreateTransProps) => {
  const { mutateAsync: createTrans, isPending } = useMutateCreateTrans();

  const onClickCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    createTrans(
      { amount: removeMoneyFormat(amount) },
      {
        onSuccess: () => {
          dialogs.close("create-trans");
          setAmount("");
        },
      }
    );
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
