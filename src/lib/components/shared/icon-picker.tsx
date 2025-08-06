"use client";

import { PopoverClose } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QueryKeys } from "@/lib/configs";
import { ServiceIcon } from "@/lib/services/icon.service";
import type { IIcon } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  const { data: icons = [] } = useQuery({
    queryKey: [QueryKeys.getIcon],
    queryFn: ServiceIcon.get,
    enabled: !disabled,
  });

  const [icon, setIcon] = useState<IIcon>(selectedIcon ?? defaultIcon);

  useEffect(() => {
    if (selectedIcon) setIcon(selectedIcon);
  }, [selectedIcon]);

  const handleSelectIcon = (icon: IIcon) => {
    setIcon(icon);
    onChange?.(icon);
  };

  const renderIcon = (icon: IIcon) => (
    <Image
      draggable={false}
      key={icon.id}
      alt={icon.code}
      src={icon.url}
      width={40}
      height={40}
      className={cn("size-8 ", {
        "size-6": size === "sm",
        "size-8": size === "md",
        "size-10": size === "lg",
        "size-3": size === "xs",
        "cursor-pointer": !disabled,
      })}
    />
  );

  return (
    <Popover>
      <PopoverTrigger disabled={disabled}>{renderIcon(icon)}</PopoverTrigger>

      <PopoverContent className="p-2">
        <div
          className={cn(
            "grid grid-cols-5 overflow-y-scroll gap-6 h-56 pr-4",
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          )}
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
