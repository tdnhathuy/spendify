import { PopoverItem } from "@/lib/components/shared/popover-item";
import { FaMoneyBillTransfer } from "react-icons/fa6";

export const ButtonNeedSplit = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    "use server";
    e.preventDefault();
    console.log("e", e);
  };

  return (
    <form onSubmit={onSubmit}>
      <PopoverItem icon={<FaMoneyBillTransfer />} title="Split 2" />
    </form>
  );
};
