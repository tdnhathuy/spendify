import {
  PageHeader,
  PageHeaderProps,
} from "@/lib/components/shared/page-header";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

interface Props {
  title: string | ReactElement;
  description?: string;
  children: React.ReactNode;
  headerProps?: Partial<PageHeaderProps>;
  className?: string;
}
export const Page = ({
  title,
  children,
  description = "",
  headerProps,
  className,
}: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col min-w-0 flex-1",
        "px-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))]",
        "mx-auto w-full max-w-screen-md",
        "scrollbar",
        "bg-foreground my-auto",
        "m-2 rounded-sm",
      )}
    >
      <div className="p-2 pl-1">
        {typeof title === "string" ? (
          <PageHeader
            title={title}
            description={description}
            {...headerProps}
          />
        ) : (
          title
        )}
      </div>

      <div
        className={cn(
          "flex flex-col gap-2",
          "overflow-y-auto overflow-x-hidden scrollbar",
          "pr-1 text-white",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
