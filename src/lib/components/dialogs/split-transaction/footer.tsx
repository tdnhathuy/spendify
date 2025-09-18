import { useMutateSplitTransaction } from "@/lib/api/app.mutate";
import { useDialog } from "@/lib/components/dialogs/dialog.store";
import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { IWallet } from "@/lib/types";

export const FooterDialogSplitTransaction = (props: {
  wallet: IWallet | undefined;
  amount: string;
}) => {
  const { data } = useDialog("split-transaction");
  const { mutateAsync: splitTransaction } = useMutateSplitTransaction();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!data) return;
    e.preventDefault();

    splitTransaction({
      idTransaction: data.idTransaction,
      splits: [
        {
          idWallet: props.wallet?.id || "",
          amount: props.amount,
          note: "",
        },
      ],
    });
  };

  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
      <WiseButton size="sm" className="w-24" variant="outline" type="button">
        Cancel
      </WiseButton>
      <WiseButton size="sm" className="w-24" variant="default" type="submit">
        Split
      </WiseButton>
    </form>
  );
};
