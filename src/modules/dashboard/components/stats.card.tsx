import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  value: string;
  desc: string;
}

export const CardStats = (props: Props) => {
  const { desc, icon, title, value } = props;
  return (
    <div className="flex flex-1 border py-2 px-4 rounded-sm bg-white">
      <span className="flex flex-col gap-1 w-full">
        <span className="flex justify-between gap-2 w-full">
          <span className="text-sm text-muted-foreground font-medium">
            {title}
          </span>
          <span>{icon}</span>
        </span>

        <span className="font-semibold text-2xl">{value}</span>
        <span className="text-sm text-muted-foreground">{desc}</span>
      </span>
    </div>
  );
};
