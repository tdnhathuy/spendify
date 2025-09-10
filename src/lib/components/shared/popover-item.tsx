import { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
  title?: string | Element;
  icon?: React.ReactNode;
};

export const PopoverItem = (props: Props) => {
  const { title, icon } = props;
  return (
    <div
      onClick={props.onClick}
      className="flex rounded-sm text-sm items-center font-medium  gap-2 w-full cursor-pointer hover:bg-gray-200 p-2 px-3"
    >
      {props.children ? (
        props.children
      ) : (
        <>
          {icon}
          {typeof title === "string" ? <span>{title}</span> : title}
        </>
      )}
    </div>
  );
};
