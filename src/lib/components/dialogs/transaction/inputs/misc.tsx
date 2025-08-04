import { IconPicker } from "@/lib/components/shared/icon-picker";
import type { IIcon } from "@/lib/types";

interface Props {
  icon?: IIcon | null;
  label?: string | null;
}
export const InputOption = (props: Props) => {
  const { icon, label } = props;

  return (
    <div className="flex w-full gap-2 border p-2 rounded">
      <IconPicker icon={icon} size="sm" disabled />
      <span>{label}</span>
    </div>
  );
};
