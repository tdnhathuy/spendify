import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useMutateAssignWallet } from "@/lib/api/app.mutate";
import { useQueryWallet } from "@/lib/api/app.query";
import { IconPicker } from "@/lib/components/shared/icon-picker";
import { WisePopoverContent } from "@/lib/components/wise/wise-popover";
import { Wallet } from "@/lib/types";
import { baseStyleTW } from "@/modules/dashboard/components/list-trans/assign-category";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  wallet?: Wallet | null;
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
    <Popover>
      <PopoverTrigger className={baseStyleTW}>
        <IconPicker icon={wallet?.icon} size="xs" disabled />
        <span>{title}</span>
      </PopoverTrigger>

      <WisePopoverContent className="flex flex-col">
        {data.map((s) => {
          return (
            <PopoverClose
              asChild
              className=" flex"
              onClick={() => onSelect(s.id)}
            >
              <span>{s.name}</span>
            </PopoverClose>
          );
        })}
      </WisePopoverContent>
    </Popover>
  );
};
