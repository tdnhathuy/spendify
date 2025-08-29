"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryIcon } from "@/lib/api/app.query";
import type { IIcon } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  icon: IIcon | null | undefined;
  onChange?: (icon: IIcon) => void;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

const defaultIcon: IIcon = {
  code: "",
  id: "",
  url: "https://cdn-icons-png.flaticon.com/512/3875/3875433.png",
};

export const IconPicker = ({
  icon: selectedIcon,
  onChange,
  disabled,
  size = "md",
}: Props) => {
  const { data: icons = [] } = useQueryIcon(disabled);

  const [icon, setIcon] = useState<IIcon>(selectedIcon ?? defaultIcon);

  useEffect(() => {
    if (selectedIcon) setIcon(selectedIcon);
  }, [selectedIcon]);

  const handleSelectIcon = (icon: IIcon) => {
    setIcon(icon);
    onChange?.(icon);
  };

  const renderIcon = (icon: IIcon) => (
    <div
      className={cn("relative w-full aspect-square", {
        "size-6": size === "sm",
        "size-8": size === "md",
        "size-10": size === "lg",
        "size-3": size === "xs",
        "cursor-pointer": !disabled,
      })}
    >
      <Image
        draggable={false}
        key={icon.id}
        alt={icon.code}
        src={icon.url}
        fill
      />
    </div>
  );

  return (
    <Popover modal>
      <PopoverTrigger tabIndex={-1} disabled={disabled}>
        {renderIcon(icon)}
      </PopoverTrigger>

      <PopoverContent className="p-2 pr-1">
        <div
          className={cn(
            "grid grid-cols-5 overflow-y-auto gap-4 h-56 overscroll-contain pr-2",
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          )}
          style={{
            scrollbarGutter: "stable",
          }}
        >
          {icons.map((ic: IIcon) => (
            <PopoverClose asChild key={ic.id}>
              <button
                type="button"
                onClick={() => handleSelectIcon(ic)}
                className={cn(
                  "flex items-center justify-center focus:outline-none border-none bg-transparent p-0"
                )}
                tabIndex={0}
              >
                {renderIcon(ic)}
              </button>
            </PopoverClose>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
