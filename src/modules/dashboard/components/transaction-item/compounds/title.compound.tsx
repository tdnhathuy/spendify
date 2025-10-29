import { TagCategory } from "@/modules/dashboard/components/transaction-item/compounds/tag-category.compound";
import { TagWallet } from "@/modules/dashboard/components/transaction-item/compounds/tag-wallet.compound";
import { useTransactionItem } from "../list-trans-item.hook";

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
      <TagCategory />
      <TagWallet />
    </span>
  );
};

const TileAdjust = () => {
  const { transaction } = useTransactionItem();

  return (
    <span className="font-semibold text-sm flex gap-2">
      <span>Adjust balance wallet </span>
      <TagWallet disabled />
    </span>
  );
};

const TileTransfer = () => {
  return "!";
  // const { isTransfer, isAdjust, transaction } = useTransactionItem();
  // const { walletFrom, walletTo } = transaction.transfer || {};

  // if (!isTransfer) return null;

  // return (
  //   <span className="font-semibold text-sm  items-center gap-2 flex">
  //     <span>Transfer</span>

  //     <WrapperIcon>
  //       <IconPicker className="size-5" icon={walletFrom?.icon} disabled />
  //     </WrapperIcon>

  //     <BiTransferAlt />

  //     <WrapperIcon>
  //       <IconPicker className="size-5" icon={walletTo?.icon} disabled />
  //     </WrapperIcon>
  //   </span>
  // );
};

const WrapperIcon = ({ children }: { children: React.ReactNode }) => {
  return <span className="bg-gray-200 flex p-1 rounded-sm">{children}</span>;
};
