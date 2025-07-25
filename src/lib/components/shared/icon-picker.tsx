import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QueryKeys } from "@/lib/configs";
import { ServiceIcon } from "@/lib/services/icon.service";
import { Icon } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  selectedIcon?: Icon | null;
  onChange?: (icon: Icon) => void;
}

const defaultIcon: Icon = {
  code: "",
  id: "",
  url: "https://cdn-icons-png.flaticon.com/512/3875/3875433.png",
};

export const IconPicker = ({ selectedIcon, onChange }: Props) => {
  const { data: icons = [] } = useQuery({
    queryKey: [QueryKeys.getIcon],
    queryFn: ServiceIcon.get,
  });

  // Khi selectedIcon từ ngoài thay đổi thì update local state
  const [icon, setIcon] = useState<Icon>(selectedIcon ?? defaultIcon);

  useEffect(() => {
    if (selectedIcon) setIcon(selectedIcon);
  }, [selectedIcon]);

  // Xử lý khi chọn icon
  const handleSelectIcon = (icon: Icon) => {
    setIcon(icon);
    onChange?.(icon);
  };

  // Render 1 icon (dùng cho cả trigger và list item)
  const renderIcon = (icon: Icon) => (
    <Image
      key={icon.id}
      alt={icon.code}
      src={icon.url}
      width={20}
      height={20}
      className={cn(" size-8 cursor-pointer")}
    />
  );

  return (
    <Popover>
      <PopoverTrigger asChild>{renderIcon(icon)}</PopoverTrigger>
      <PopoverContent className="p-2">
        <div
          className={cn(
            "grid grid-cols-5 overflow-y-scroll gap-6 h-56 pr-4",
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          )}
        >
          {icons.map((ic: Icon) => (
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
