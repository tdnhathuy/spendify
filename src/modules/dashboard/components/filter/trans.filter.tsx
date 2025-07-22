import { LabelBlock } from "@/lib/components/shared/label-block";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";

export const FilterTrans = () => {
  return (
    <WisePopoverContent
      className="grid grid-cols-2 gap-2 w-[50vw] bg-red-200"
      side="bottom"
      align="start"
    >
      <LabelBlock label="Wallets">
        <div>Wallets</div>
      </LabelBlock>

      <LabelBlock label="Time">
        <div>Time</div>
      </LabelBlock>
    </WisePopoverContent>
  );
};
