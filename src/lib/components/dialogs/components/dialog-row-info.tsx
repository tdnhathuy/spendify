import { cn } from "@/lib/utils";
import { isValidElement, ReactElement } from "react";

export interface PropsDialogRowInfo {
  icon: ReactElement;
  label: string;
  value: string | ReactElement;
  onClick?: () => void;
}
export const RowInfoDialog = (props: PropsDialogRowInfo) => {
  const { icon, label, value, onClick } = props;
  return (
    <span
      className={cn("flex items-center gap-2 ", onClick && "cursor-pointer")}
      onClick={onClick}
    >
      <span className="bg-gray-100 p-2 w-8 h-8 flex justify-center items-center rounded-sm text-xl">
        {icon}
      </span>

      <span className="flex flex-col text-base">
        <span className="font-semibold text-xs">{label}</span>
        {isValidElement(value) ? (
          <span className="text-xs font-medium break-all text-gray-500">
            {value}
          </span>
        ) : (
          <span className="text-xs font-medium break-all text-gray-500">
            {value}
          </span>
        )}
      </span>
    </span>
  );
};
