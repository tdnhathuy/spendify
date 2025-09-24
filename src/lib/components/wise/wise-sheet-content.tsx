import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { sheets } from "@/lib/components/sheets/sheet.store";
import {
  WiseButton,
  WiseButtonProps,
} from "@/lib/components/wise/button/wise-button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type Props = {
  children: React.ReactNode;
  className?: string;

  footer?: React.ReactNode;

  title?: string;
  desc?: string;
  loading?: boolean;
};

export const WiseSheetContent = (props: Props) => {
  const { children, title = "Title", desc, className, loading } = props;
  return (
    <SheetContent className="flex flex-col gap-2">
      <SheetHeader className="border-b">
        {!!title && <SheetTitle>{title}</SheetTitle>}
        {!!desc && <SheetDescription>{desc}</SheetDescription>}
      </SheetHeader>

      <div
        className={cn(
          "overflow-y-auto scrollbar flex flex-col h-full px-2 mr-1",
          className
        )}
      >
        {loading ? <Loader /> : children}
      </div>

      {props.footer && (
        <SheetFooter className="border-t flex flex-row">
          {props.footer}
        </SheetFooter>
      )}
    </SheetContent>
  );
};

interface WiseSheetFooterButtonProps extends WiseButtonProps {
  label: string;
}

type WiseSheetFooterProps = {
  buttons?: WiseSheetFooterButtonProps[];

  onClickConfirm?: () => void;
  onClickCancel?: () => void;
};
export const WiseSheetFooter = (props: WiseSheetFooterProps) => {
  const { onClickCancel, onClickConfirm } = props;
  const {
    buttons = [
      { label: "Confirm", variant: "default", onClick: onClickConfirm },
      {
        label: "Cancel",
        variant: "outline",
        onClick: onClickCancel || (() => sheets.closeAll()),
      },
    ],
  } = props;

  return buttons.map((x, idx) => {
    const { label, ...btnProps } = x;
    return (
      <WiseButton
        key={idx}
        {...btnProps}
        className={cn("w-24", btnProps.className)}
      >
        <span>{label}</span>
      </WiseButton>
    );
  });
};
