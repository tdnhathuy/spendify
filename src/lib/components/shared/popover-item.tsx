import { PopoverClose } from "@radix-ui/react-popover";
import { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  title?: string | Element;
  icon?: React.ReactNode;
};

export const PopoverItem = (props: Props) => {
  const { title, icon } = props;
  return (
    <PopoverClose
      onClick={props.onClick}
      className="flex rounded-sm text-sm items-center font-medium  gap-2 w-full cursor-pointer hover:bg-focus p-2 "
    >
      {props.children ? (
        props.children
      ) : (
        <>
          {icon}
          {typeof title === "string" ? <span>{title}</span> : title}
        </>
      )}
    </PopoverClose>
  );
};
