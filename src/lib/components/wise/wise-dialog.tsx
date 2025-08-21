import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MdClose } from "react-icons/md";

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
  desc?: string;
  footer?: React.ReactNode;
  className?: string;
  ctnClassName?: string;
  headerClassName?: string;
};
export const WiseDialogContent = (props: WiseDialogContentProps) => {
  const { title = "Title Dialog", desc = "" } = props;
  const classTitle = props.headerProps?.className || "";
  const classFooter = props.footerProps?.className || "";

  return (
    <DialogContent
      showCloseButton={false}
      className={cn(
        "-translate-y-[75%] p-0 gap-0 flex flex-col overflow-hidden",
        props.ctnClassName
      )}
    >
      <DialogHeader
        {...props.headerProps}
        className={cn(
          "border-b p-2 px-4 relative gap-0",
          props.headerClassName
        )}
      >
        <DialogTitle
          className={cn("text-base font-semibold text-left", classTitle)}
        >
          {title}
        </DialogTitle>

        {desc && (
          <DialogDescription className="text-xs text-left">
            {desc}
          </DialogDescription>
        )}

        <DialogClose
          tabIndex={-1}
          className={cn(
            "absolute top-2 right-2 p-1 rounded-sm hover:bg-gray-100",
            props.headerProps?.className
          )}
        >
          <MdClose />
        </DialogClose>
      </DialogHeader>

      <div
        className={cn(
          "flex flex-1 flex-col max-h-full p-2 px-4 overflow-hidden",
          props.className
        )}
      >
        {props.children}
      </div>

      {props.footer && (
        <DialogFooter
          {...props.footerProps}
          className={cn("p-2 border-t", classFooter)}
        >
          {props.footer}
        </DialogFooter>
      )}
    </DialogContent>
  );
};
