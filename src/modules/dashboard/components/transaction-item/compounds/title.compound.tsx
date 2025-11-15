import { TagCategory } from "@/modules/dashboard/components/transaction-item/compounds/tag-category.compound";
import { TagWallet } from "@/modules/dashboard/components/transaction-item/compounds/tag-wallet.compound";
import { useTransactionItem } from "../list-trans-item.hook";
import { ArrowRight } from "lucide-react";

export const Title = () => {
  const { isTransfer, isAdjust, categoryName, isInitTransaction } =
    useTransactionItem();

  const title = categoryName;

  if (isTransfer) return <TileTransfer />;
  if (isAdjust) return <TileAdjust />;
  if (isInitTransaction)
    return (
      <span className="flex items-center gap-2 font-semibold">
        <span>Init balance wallet</span>
        <TagWallet disabled />
      </span>
    );

  return (
    <span className="flex  items-center gap-2">
      <span className="font-semibold text-sm">{title}</span>
    </span>
  );
};

const TileAdjust = () => {
  return (
    <span className="font-semibold text-sm flex gap-2">
      <span>Adjust balance wallet </span>
      <TagWallet disabled />
    </span>
  );
};

const TileTransfer = () => {
  const { transaction } = useTransactionItem();
  console.log("transaction ----", transaction);

  return (
    <span className="font-semibold text-sm flex gap-2 items-center">
      <TagWallet disabled />
      <ArrowRight className="size-4" />
      <TagWallet disabled wallet={transaction.transfer?.toWallet} />
    </span>
  );
};

const WrapperIcon = ({ children }: { children: React.ReactNode }) => {
  return <span className="bg-gray-200 flex p-1 rounded-sm">{children}</span>;
};
