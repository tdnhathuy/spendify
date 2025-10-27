import { useMutateToasty } from "@/hooks/use-query-toast";
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
  // const { mutateAsync: createTrans, isPending } = useMutateCreateTrans();
  const { asyncToast: createTrans, isLoading } =
    useMutateToasty(useMutateCreateTrans);

  const onClickCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dialogs.close("create-trans");
    createTrans({ amount: removeMoneyFormat(amount) });
  };

  const onClickCancel = () => {
    dialogs.close("create-trans");
  };

  return (
    <>
      <WiseButton
        disabled={isLoading}
        variant={"outline"}
        size="sm"
        onClick={onClickCancel}
      >
        Cancel
      </WiseButton>

      <WiseButton
        disabled={isLoading || !amount}
        variant={"default"}
        size="sm"
        onClick={onClickCreate}
      >
        Create
      </WiseButton>
    </>
  );
};
