"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryIcon } from "@/lib/api/app.query";
import { WiseIcon, type IconSize } from "@/lib/components/wise/wise-icon";
import type { IIcon } from "@/lib/types";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

export interface IconPickerProps {
  icon: IIcon | undefined | null;
  onChange?: (icon: IIcon) => void;
  disabled?: boolean;
  size?: IconSize;
  className?: string;
}

interface IconSection {
  title: string;
  icons: IIcon[];
}

const IconPickerComponent = ({
  icon: selectedIcon,
  onChange,
  disabled = false,
  size = "md",
  className,
}: IconPickerProps) => {
  const { data: icons = [] } = useQueryIcon(disabled);

  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState<IIcon | null | undefined>(selectedIcon);

  // Memoize icon filtering để tránh tính toán lại mỗi lần render
  const iconSections = useMemo<IconSection[]>(() => {
    const iconUser = icons.filter((x) => x && !x.isDefault);
    const iconBank = icons.filter((x) => x.isDefault && x.url.includes("bank"));
    const iconEWallet = icons.filter(
      (x) => x.isDefault && x.url.includes("e-wallet")
    );
    const iconDefault = icons.filter(
      (x) => x.isDefault && x.url.includes("https")
    );

    return [
      { title: "User", icons: iconUser },
      { title: "Default", icons: iconDefault },
      { title: "Bank", icons: iconBank },
      { title: "E-Wallet", icons: iconEWallet },
    ];
  }, [icons]);

  // Sync internal state với prop
  useEffect(() => {
    setIcon(selectedIcon);
  }, [selectedIcon]);

  // Sử dụng useCallback để tránh tạo lại function mỗi lần render
  const handleSelectIcon = useCallback(
    (selectedIcon: IIcon) => {
      setIcon(selectedIcon);
      onChange?.(selectedIcon);
      setIsOpen(false);
    },
    [onChange]
  );

  // Memoize icon wrapper size classes
  const iconWrapperClasses = useMemo(
    () =>
      cn(
        "relative w-full aspect-square",
        {
          "size-6": size === "sm",
          "size-8": size === "md",
          "size-10": size === "lg",
          "size-3": size === "xs",
          "cursor-pointer": !disabled,
        },
        className
      ),
    [size, disabled, className]
  );

  const renderIcon = useCallback(
    (displayIcon: IIcon | null | undefined) => (
      <div className={iconWrapperClasses}>
        <WiseIcon icon={displayIcon} size={size} />
      </div>
    ),
    [iconWrapperClasses, size]
  );

  const renderSection = useCallback(
    ({ title, icons }: IconSection) => {
      if (!icons.length) return null;

      return (
        <div key={title} className="w-full gap-2 flex flex-col">
          <h2 className="flex font-semibold px-2 text-sm">{title}</h2>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 p-2">
            {icons.map((iconItem) => (
              <button
                type="button"
                key={iconItem.id}
                className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary aspect-square flex items-center justify-center"
                onClick={() => handleSelectIcon(iconItem)}
                aria-label={`Select ${iconItem.url}`}
              >
                <WiseIcon icon={iconItem} size={40} />
              </button>
            ))}
          </div>
        </div>
      );
    },
    [handleSelectIcon, size]
  );

  if (disabled) {
    return renderIcon(icon);
  }

  return (
    <Popover modal open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          className="focus:outline-none"
          aria-label="Open icon picker"
        >
          {renderIcon(icon)}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-2 pr-1 w-[90vw] lg:w-[50vw]">
        <div className="scrollbar overflow-y-scroll h-72 w-full gap-3 flex flex-col">
          {iconSections.map(renderSection)}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Memoize component để tránh re-render không cần thiết
export const IconPicker = memo(IconPickerComponent);
