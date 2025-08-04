import { cn } from "@/lib/utils";

type Props = {
  label: string;
  children: React.ReactNode;
  labelClassName?: string;
  className?: string;
};
export const LabelBlock = (props: Props) => {
  console.log("props", props);
  return (
    <div
      {...props}
      className={cn("flex flex-col gap-1 w-full ", props.className)}
    >
      <span
        className={cn(
          "text-sm text-gray-500 w-full text-left ",
          props.labelClassName
        )}
      >
        {props.label}
      </span>

      {props.children}
    </div>
  );
};
