import { WiseButton } from "@/lib/components/wise/button/wise-button";

export const ListTrans = () => {
  return (
    <div className="flex gap-2 ">
      <span className="flex justify-between w-full items-center">
        <h1 className="font-semibold text-xl">List Transaction</h1>
        <WiseButton size={"sm"}>Add Transaction</WiseButton>
      </span>
    </div>
  );
};
