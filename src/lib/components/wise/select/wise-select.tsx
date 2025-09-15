import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface WiseSelectionProps<T> {
  options: T[];
  fieldValue: keyof T;
  fieldLabel: keyof T;
  onChange: (value: T | undefined) => void;
  renderTrigger?: (value: T) => React.ReactNode;
  renderItem?: (value: T) => React.ReactNode;
  className?: string;
}

export const WiseSelection = <T,>(props: WiseSelectionProps<T>) => {
  const {
    options = [],
    onChange,
    fieldLabel,
    fieldValue,
    renderItem,
    renderTrigger,
    className,
  } = props;
  return (
    <Select
      onValueChange={(value) => {
        const val = options.find((x) => x[fieldValue] === value);
        onChange(val);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => {
          if (renderItem) return renderItem(opt);

          const value = opt[fieldValue] as string;
          const label = opt[fieldLabel] as string;

          return (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
