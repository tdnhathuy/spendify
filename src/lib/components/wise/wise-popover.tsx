import { PopoverContent, PopoverContentProps } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props extends Pick<PopoverContentProps, "align" | "side"> {
  children: React.ReactNode;
  className?: string;
}

export const WisePopoverContent = (props: Props) => {
  return (
    <PopoverContent
      className={cn(
        "p-1 rounded-sm w-[var(--radix-popover-trigger-width)]",
        "bg-foreground text-white",
        props.className
      )}
      align={props.align ?? "center"}
      side={props.side ?? "bottom"}
      onClick={(e) => e.stopPropagation()}
    >
      {props.children}
    </PopoverContent>
  );
};
