import { IIcon } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconProps {
  icon: IIcon | null | undefined;
  size?: IconSize;
}

export type IconSize = "xs" | "sm" | "md" | "lg" | number;

export const Icon = (props: IconProps) => {
  const { icon, size = "md" } = props;

  const src = icon?.url || "";

  const sizes = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
  };

  const sizeValue = typeof size === "number" ? size : sizes[size];

  return (
    <div className={cn("relative w-full aspect-square")}>
      <Image src={src} alt={src} width={sizeValue} height={sizeValue} />
    </div>
  );
};
