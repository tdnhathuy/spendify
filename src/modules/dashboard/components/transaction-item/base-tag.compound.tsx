import { IconPicker } from "@/lib/components";
import { IIcon } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { isValidElement } from "react";
import { PiWarningBold } from "react-icons/pi";

const baseTW = cn(
  "flex cursor-pointer items-center justify-center px-2 py-px border  rounded-full gap-1 w-fit"
);

const warningTW = "bg-yellow-500/10 border-yellow-500 text-yellow-500";
const walletTW = "bg-green-500/10 border-green-500 text-green-500";
const categoryTW = "bg-blue-500/10 border-blue-500 text-blue-500";
const dateTW = "bg-blue-500/10 border-blue-500 text-blue-500";
const splitTW = "bg-blue-500/10 border-blue-500 text-blue-500";

const variants = cva(baseTW, {
  variants: {
    variant: {
      warning: warningTW,
      wallet: walletTW,
      category: categoryTW,
      date: dateTW,
      split: splitTW,
    },
  },
  defaultVariants: { variant: "warning" },
});

interface TransactionItemTagProps {
  icon: IIcon | React.ReactElement | null;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: VariantProps<typeof variants>["variant"];
  allowPropagation?: boolean; // Thêm prop để control event propagation
}

export const TransactionItemTag = (props: TransactionItemTagProps) => {
  const {
    icon = null,
    title,
    onClick = () => {},
    variant,
    allowPropagation = false,
  } = props;

  const renderIcon = () => {
    if (isValidElement(icon)) return icon;

    if (icon) {
      return <IconPicker icon={icon as IIcon} size="xs" disabled />;
    }
    return <PiWarningBold />;
  };

  return (
    <button
      className={cn(variants({ variant }))}
      onClick={(e) => {
        if (!allowPropagation) {
          e.stopPropagation();
        }
        onClick && onClick(e);
      }}
    >
      <span>{renderIcon()}</span>
      <span className="text-xs font-semibold">{title}</span>
    </button>
  );
};
