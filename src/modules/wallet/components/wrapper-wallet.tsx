import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const WrapperWallet = (props: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col  rounded-lg border shadow-2xs bg-white overflow-hidden",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
