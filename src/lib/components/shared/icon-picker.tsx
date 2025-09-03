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
  icon: IIcon | undefined | null;
  onChange?: (icon: IIcon) => void;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

const defaultIcon: IIcon = {
  id: "",
  url: "https://cdn-icons-png.flaticon.com/512/3875/3875433.png",
  isSystemIcon: true,
};

export const IconPicker = ({
  icon: selectedIcon,
  onChange,
  disabled,
  size = "md",
}: Props) => {
  const { data: icons = [] } = useQueryIcon(disabled);
  console.log("icons", icons);

  const [icon, setIcon] = useState<IIcon>(selectedIcon ?? defaultIcon);

  const iconUser = icons.filter((x) => !x.isSystemIcon);
  const iconBank = icons.filter(
    (x) => x.isSystemIcon && x.url.includes("bank")
  );
  const iconEWallet = icons.filter(
    (x) => x.isSystemIcon && x.url.includes("e-wallet")
  );

  useEffect(() => {
    if (selectedIcon) setIcon(selectedIcon);
  }, [selectedIcon]);

  const handleSelectIcon = (icon: IIcon) => {
    setIcon(icon);
    onChange?.(icon);
  };

  const renderSection = (title: string, icons: IIcon[]) => {
    return (
      <div className="w-full gap-2 flex flex-col">
        <h1 className="flex font-semibold px-2">{title}</h1>
        <div className="flex flex-wrap gap-4 bg-red-200 items-center justify-center">
          {icons.map((icon) => (
            <div key={icon.id} className="bg-gray-100 rounded-md p-2">
              {renderIcon(icon)}
            </div>
          ))}
        </div>
      </div>
    );
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
        alt={icon.url || ""}
        src={icon.url || ""}
        fill
      />
    </div>
  );

  return (
    <Popover modal>
      <PopoverTrigger tabIndex={-1} disabled={disabled}>
        {renderIcon(icon)}
      </PopoverTrigger>

      <PopoverContent className="p-2 pr-1 w-[50vw]">
        <div
          className={cn(
            "scrollbar overflow-y-scroll h-72 w-full gap-2 flex flex-col"
          )}
        >
          {renderSection("User", iconUser)}
          {renderSection("Bank", iconBank)}
          {renderSection("E-Wallet", iconEWallet)}
          {/* {icons.map((ic: IIcon) => (
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
          ))} */}
        </div>
      </PopoverContent>
    </Popover>
  );
};
