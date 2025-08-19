import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useMutateAssignWallet } from "@/lib/api/app.mutate";
import { useQueryWallet } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import type { IWallet } from "@/lib/types";
import { WrapperAssignTrigger } from "@/modules/dashboard/components/list-trans/assign-category";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  wallet?: IWallet | null;
  idTransaction: string;
}

export const AssignWallet = (props: Props) => {
  const { wallet, idTransaction } = props;
  const title = wallet?.name || "Unwallet";

  const { data = [] } = useQueryWallet();

  const { mutate: assignWallet } = useMutateAssignWallet();

  const onSelect = (id: string) => {
    assignWallet({ idTransaction, idWallet: id });
  };
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <WrapperAssignTrigger title={title}>
          <IconPicker icon={wallet?.icon} size="xs" disabled />
        </WrapperAssignTrigger>
      </PopoverTrigger>

      <WisePopoverContent className="flex flex-col">
        {data.map((s) => {
          return (
            <PopoverClose
              key={s.id}
              asChild
              className="flex"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(s.id);
              }}
            >
              <span>{s.name}</span>
            </PopoverClose>
          );
        })}
      </WisePopoverContent>
    </Popover>
  );
};
