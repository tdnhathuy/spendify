import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const baseTW = cn(
  "flex cursor-pointer items-center justify-center px-2 py-px border  rounded-full gap-1"
);

const warningTW = "bg-yellow-500/10 border-yellow-500 text-yellow-500";
const walletTW = "bg-green-500/10 border-green-500 text-green-500";
const categoryTW = "bg-blue-500/10 border-blue-500 text-blue-500";

const variants = cva(baseTW, {
  variants: {
    variant: {
      warning: warningTW,
      wallet: walletTW,
      category: categoryTW,
    },
  },
  defaultVariants: { variant: "warning" },
});

interface ListTransItemTagProps {
  icon?: React.ReactElement;
  title?: string;
  onClick?: () => void;
  variant?: VariantProps<typeof variants>["variant"];
}

export const ListTransItemTag = (props: ListTransItemTagProps) => {
  const { icon, title, onClick = () => {}, variant } = props;

  return (
    <button
      className={cn(variants({ variant }))}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <span>{icon}</span>
      <span className="text-xs font-semibold">{title}</span>
    </button>
  );
};
