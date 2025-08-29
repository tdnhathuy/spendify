import { PageHeader } from "@/lib/components/shared/page-header";
import { ReactElement } from "react";

interface Props {
  title: string | ReactElement;
  description?: string;
  children: React.ReactNode;
}
export const Page = ({ title, children, description = "" }: Props) => {
  return (
    <div className="gap-4 flex flex-col ">
      {typeof title === "string" ? (
        <PageHeader title={title} description={description} />
      ) : (
        title
      )}

      {children}
    </div>
  );
};
