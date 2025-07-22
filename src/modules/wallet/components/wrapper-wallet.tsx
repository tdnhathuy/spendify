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
        "w-full h-56 cursor-pointer rounded-lg border shadow-2xs bg-white",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
