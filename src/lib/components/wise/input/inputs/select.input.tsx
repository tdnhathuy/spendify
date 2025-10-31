import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface WiseSelectInputProps<T> {
  className?: string;
  options?: T[];
  renderItem?: (value: T) => React.ReactNode;
  fieldValue?: keyof T;
  fieldLabel?: keyof T;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string, rawValue?: T) => void;
}

export const WiseSelectInput = <T,>(props: WiseSelectInputProps<T>) => {
  const {
    className,
    options = [],
    renderItem,
    fieldValue = "id",
    fieldLabel = "name",
    placeholder = "Select...",
    value,
    onValueChange,
  } = props;

  return (
    <Select
      {...(value ? { value } : {})}
      {...(onValueChange
        ? {
            onValueChange: (value) =>
              onValueChange(
                value,
                options.find((x) => x[fieldValue as keyof T] === value)
              ),
          }
        : {})}
    >
      <SelectTrigger
        className={cn(
          "focus-visible:border-0 focus-visible:ring-transparent focus-visible:ring-0",
          "border-border border focus-visible:border-white",
          " bg-foreground",
          className
        )}
        style={{ height: "42px" }}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="bg-foreground ">
        <SelectGroup className="flex flex-col space-y-1 text-white">
          {options.map((opt) => {
            if (!fieldValue || !fieldLabel) return null;

            const itemValue = opt[fieldValue as keyof T] as string;
            const itemLabel = opt[fieldLabel as keyof T] as string;

            return (
              <SelectItem
                key={itemValue}
                value={itemValue}
                className="hover:bg-focus transition-all duration-100"
              >
                {renderItem ? renderItem(opt) : itemLabel}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
