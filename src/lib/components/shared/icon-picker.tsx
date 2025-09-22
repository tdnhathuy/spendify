"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryIcon } from "@/lib/api/app.query";
import type { IIcon } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IconPickerProps {
  icon: IIcon | undefined | null;
  onChange?: (icon: IIcon) => void;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
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
  className,
}: IconPickerProps) => {
  const { data: icons = [] } = useQueryIcon(disabled);

  const [icon, setIcon] = useState<IIcon>(selectedIcon ?? defaultIcon);
  const [isOpen, setIsOpen] = useState(false);

  const iconUser = icons.filter((x) => !x.isSystemIcon);
  const iconBank = icons.filter(
    (x) => x.isSystemIcon && x.url.includes("bank")
  );
  const iconEWallet = icons.filter(
    (x) => x.isSystemIcon && x.url.includes("e-wallet")
  );

  const iconDefault = icons.filter(
    (x) => x.isSystemIcon && x.url.includes("https")
  );

  useEffect(() => {
    if (selectedIcon) setIcon(selectedIcon);
  }, [selectedIcon]);

  const handleSelectIcon = (icon: IIcon) => {
    setIcon(icon);
    onChange?.(icon);
    setIsOpen(false);
  };

  const renderSection = (title: string, icons: IIcon[]) => {
    if (!icons.length) return null;
    return (
      <div className="w-full gap-2 flex flex-col">
        <h1 className="flex font-semibold px-2">{title}</h1>
        <div className="flex flex-wrap gap-4 p-2 justify-center ">
          {icons.map((icon) => (
            <div
              key={icon.id}
              className="bg-gray-100 rounded-md p-2"
              onClick={() => handleSelectIcon(icon)}
            >
              {renderIcon(icon)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderIcon = (icon: IIcon) => (
    <div
      className={cn(
        "relative w-full aspect-square",
        {
          "size-6": size === "sm",
          "size-8": size === "md",
          "size-10": size === "lg",
          "size-3": size === "xs",
          "cursor-pointer": !disabled,
        },
        className
      )}
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

  if (disabled) {
    return renderIcon(icon);
  }

  return (
    <Popover modal open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger tabIndex={-1} disabled={disabled}>
        {renderIcon(icon)}
      </PopoverTrigger>

      <PopoverContent className="p-2 pr-1 w-[90vw] lg:w-[50vw]">
        <div
          className={cn(
            "scrollbar overflow-y-scroll h-72 w-full gap-2 flex flex-col "
          )}
        >
          {renderSection("User", iconUser)}
          {renderSection("Default", iconDefault)}
          {renderSection("Bank", iconBank)}
          {renderSection("E-Wallet", iconEWallet)}
        </div>
      </PopoverContent>
    </Popover>
  );
};
