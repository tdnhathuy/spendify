import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface WiseTextInputProps extends React.ComponentProps<"input"> {}

export const WiseTextInput = (props: WiseTextInputProps) => {
  return (
    <Input
      {...props}
      className={cn(
        "w-full bg-foreground",
        "focus-visible:border-2 focus-visible:ring-0 ring-0 border-0",
        "h-10 text-white rounded-sm selection:bg-blue-950",
        props.className
      )}
    />
  );
};
