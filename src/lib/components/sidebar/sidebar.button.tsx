import { sidebarStyleConfig, useSidebar } from "@/components/ui/sidebar";
import {
  WiseButton,
  WiseButtonProps,
} from "@/lib/components/wise/button/wise-button";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  icon?: React.ReactNode;
  btnProps?: WiseButtonProps;
}

export const SidebarButton = (props: Props) => {
  const { btnProps } = props;
  const { open } = useSidebar();

  return (
    <WiseButton
      {...btnProps}
      className={cn(
        "w-full cursor-pointer items-center justify-start p-0 relative overflow-hidden",
        btnProps?.className
      )}
      asChild
    >
      <div>
        <div
          className="justify-center flex items-center h-full "
          style={{
            width: `calc(${sidebarStyleConfig.SIDEBAR_WIDTH_ICON} - 1rem)`,
          }}
        >
          {props.icon}
        </div>

        <span
          style={{ left: sidebarStyleConfig.SIDEBAR_WIDTH_ICON }}
          className={cn(
            "flex flex-1 h-full items-center transition absolute -translate-x-4",
            open ? "max-w-full" : "max-w-0"
          )}
        >
          {props.label}
        </span>
      </div>
    </WiseButton>
  );
};
