import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface WiseTextInputProps extends React.ComponentProps<"input"> {}

export const WiseTextInput = (props: WiseTextInputProps) => {
  return (
    <Input
      {...props}
      className={cn(
        "w-full bg-foreground",
        "border-border focus-visible:border-white",
        "h-10 text-white rounded-sm selection:bg-blue-950",
        props.className
      )}
      style={{ height: "42px" }}
    />
  );
};
