import { useSidebar } from "@/components/ui/sidebar";
import {
  WiseButton,
  WiseButtonProps,
} from "@/lib/components/wise/button/wise-button";

interface Props {
  label: string;
  btnProps?: WiseButtonProps;
}
export const SidebarButton = (props: Props) => {
  const { btnProps } = props;

  const { state } = useSidebar();
  console.log("state", state);
  return (
    <WiseButton {...btnProps}>
      <span>{props.label}</span>
    </WiseButton>
  );
};
