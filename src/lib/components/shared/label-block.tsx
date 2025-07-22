import { cn } from "@/lib/utils";

type Props = {
  label: string;
  children: React.ReactNode;
  labelClassName?: string;
  className?: string;
};
export const LabelBlock = (props: Props) => {
  return (
    <div className={cn("flex flex-col gap-1", props.className)}>
      <span className={cn("text-sm text-gray-500", props.labelClassName)}>
        {props.label}
      </span>

      {props.children}
    </div>
  );
};
