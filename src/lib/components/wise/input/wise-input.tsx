import {
  WiseSelectInput,
  WiseSelectInputProps,
  WiseTextInput,
  WiseTextInputProps,
} from "@/lib/components/wise/input/inputs";

import { WiseInputLabel } from "@/lib/components/wise/input/label";

// Define base props that all input types share
interface BaseWiseInputProps {
  label?: string;
}

type WiseInputProps<T> =
  | (BaseWiseInputProps & {
      type: "text";
    } & WiseTextInputProps)
  | (BaseWiseInputProps & {
      type: "select";
    } & WiseSelectInputProps<T>);

// Type guard functions for better type narrowing
function isTextInput<T>(
  props: WiseInputProps<T>
): props is BaseWiseInputProps & {
  type: "text";
} & WiseTextInputProps {
  return props.type === "text";
}

function isSelectInput<T>(
  props: WiseInputProps<T>
): props is BaseWiseInputProps & {
  type: "select";
} & WiseSelectInputProps<T> {
  return props.type === "select";
}

// Main component with proper type inference
export const WiseInput = <T,>(props: WiseInputProps<T>) => {
  const renderInput = () => {
    if (isTextInput(props)) {
      return <WiseTextInput {...props} />;
    }

    if (isSelectInput(props)) {
      return <WiseSelectInput<T> {...props} />;
    }

    // Exhaustive check - TypeScript will error if we add new types and forget to handle them
    const _exhaustiveCheck: never = props;
    return _exhaustiveCheck;
  };

  return (
    <div className="flex flex-col gap-2 p-0 m-0">
      {props.label && <WiseInputLabel label={props.label} />}
      {renderInput()}
    </div>
  );
};

// Export type for external use
export type { WiseInputProps };
