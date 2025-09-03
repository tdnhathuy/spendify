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
    <section
      className={cn(
        "gap-4 flex flex-col min-w-0 flex-1 flex-col)} ",
        "min-w-0 flex-1 overflow-y-auto overflow-x-hidden  ",
        "px-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] pb-[max(36px,env(safe-area-inset-bottom))]",
        "pb-48 lg:pb-0",
        "mx-auto w-full max-w-screen-md",
        "scrollbar"
      )}
    >
      <div className=" p-4 ">
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

      <div className={cn("flex flex-col gap-2", className)}>{children}</div>
    </section>
  );
};
