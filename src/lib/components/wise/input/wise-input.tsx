import {
  WiseTextInput,
  WiseTextInputProps,
} from "@/lib/components/wise/input/inputs/text.input";
import {
  WiseInputLabel,
  WiseInputLabelProps,
} from "@/lib/components/wise/input/label";

export type WiseInputType = "text";

export interface WiseInputProps
  extends Partial<WiseInputLabelProps>,
    Partial<WiseTextInputProps> {
  type?: WiseInputType;
}

export const WiseInput = (props: WiseInputProps) => {
  const { type = "text" } = props;

  const renderInput = () => {
    const obj: Record<WiseInputType, React.ReactNode> = {
      text: <WiseTextInput {...props} />,
    };

    return obj[type];
  };

  return (
    <div className="flex flex-col gap-2">
      <WiseInputLabel {...props} />
      {renderInput()}
    </div>
  );
};
