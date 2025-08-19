import { cn } from "@/lib/utils";
import { cloneElement, isValidElement, ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  value: string;
}

export const CardStats = (props: Props) => {
  const { icon, title, value } = props;

  const Icon = isValidElement<{ className?: string }>(icon)
    ? cloneElement<{ className?: string }>(icon, {
        className: cn(icon.props.className, "size-5 sm:size-6"),
      })
    : null;

  return (
    <div className="flex flex-1 max-w-full border py-2 px-4 rounded bg-white">
      <span className="flex flex-col gap-1 w-full">
        <span
          className={cn(
            "flex  w-full items-center justify-center ",
            "flex-col sm:flex-row sm:gap-2"
          )}
        >
          {Icon}
          <span className="text-xs sm:text-sm text-muted-foreground font-medium line-clamp-1">
            {title}
          </span>
        </span>

        <span className="font-semibold text-base text-center">{value}</span>
      </span>
    </div>
  );
};
