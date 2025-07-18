import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  triggerProps?: React.ComponentProps<typeof DialogTrigger>;
  content: React.ReactNode;
};
export const WiseDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger {...props.triggerProps}>{props.children}</DialogTrigger>

      {props.content}
    </Dialog>
  );
};

type WiseDialogContentProps = {
  children: React.ReactNode;
  headerProps?: React.ComponentProps<typeof DialogHeader>;
  footerProps?: React.ComponentProps<typeof DialogFooter>;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
};
export const WiseDialogContent = (props: WiseDialogContentProps) => {
  const classTitle = props.headerProps?.className || "";
  return (
    <DialogContent className={cn("py-4", props.className)}>
      <DialogHeader {...props.headerProps}>
        {props.title ? (
          <DialogTitle className={cn(classTitle, "")}>
            {props.title}
          </DialogTitle>
        ) : null}
      </DialogHeader>

      {props.children}

      {props.footer && (
        <DialogFooter {...props.footerProps}>{props.footer}</DialogFooter>
      )}
    </DialogContent>
  );
};
