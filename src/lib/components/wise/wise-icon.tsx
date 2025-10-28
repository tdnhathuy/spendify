import type { IIcon } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo } from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | number;

export interface IconProps {
  icon: IIcon | null | undefined;
  size?: IconSize;
  className?: string;
  alt?: string;
}

const DEFAULT_ICON_URL = "https://cdn-icons-png.flaticon.com/512/18272/18272886.png";

const SIZE_MAP = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
} as const;

const WiseIconComponent = ({ 
  icon, 
  size = "md",
  className,
  alt
}: IconProps) => {
  const src = icon?.url || DEFAULT_ICON_URL;
  const sizeValue = typeof size === "number" ? size : SIZE_MAP[size];
  const altText = alt || icon?.url || "Icon";

  return (
    <Image
      draggable={false}
      src={src}
      alt={altText}
      width={sizeValue}
      height={sizeValue}
      className={cn(className)}
      loading="lazy"
      unoptimized={src.startsWith("/svg/")}
    />
  );
};

// Memoize component để tránh re-render không cần thiết
export const WiseIcon = memo(WiseIconComponent);
