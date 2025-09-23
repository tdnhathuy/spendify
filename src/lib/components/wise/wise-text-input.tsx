"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

// Optimized formatMoney for high-performance input formatting
const formatMoneyFast = (() => {
  // Cache the formatter instance to avoid recreation
  const formatter = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Pre-compiled regex for better performance
  const cleanupRegex = /[^\d-]/g;

  return (amount: number): string => {
    if (!amount || amount === 0) return "";

    // Use cached formatter and simple string operations
    const formatted = formatter.format(Math.abs(amount));

    // Handle negative numbers with simple prefix
    return amount < 0 ? `-${formatted}` : formatted;
  };
})();

type WiseTextInputMode = "normal" | "money";

interface WiseTextInputProps extends React.ComponentProps<"input"> {
  mode?: WiseTextInputMode;
  onValueChange?: (value: string, rawValue?: number) => void;
  money?: boolean;
}

function WiseTextInput({
  className,
  type,
  mode = "normal",
  value: controlledValue,
  onChange,
  onValueChange,
  money, // deprecated prop
  ...props
}: WiseTextInputProps) {
  // Support legacy money prop
  const actualMode: WiseTextInputMode = money ? "money" : mode;

  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = React.useState("");

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Format value based on mode
  const formatValue = React.useCallback(
    (inputValue: string): { formatted: string; raw: number } => {
      if (!inputValue) return { formatted: "", raw: 0 };

      if (actualMode === "money") {
        // Extract numeric value (remove all non-digit characters)
        const numericValue = Number(inputValue.replace(/\D/g, ""));
        return {
          formatted: numericValue ? formatMoneyFast(numericValue) : "",
          raw: numericValue,
        };
      } else {
        // Normal mode: allow all characters, extract numeric value for raw
        const numericValue = Number(inputValue.replace(/\D/g, "")) || 0;
        return {
          formatted: inputValue,
          raw: numericValue,
        };
      }
    },
    [actualMode]
  );

  // Handle input change
  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = ev.target.value;
      const { formatted, raw } = formatValue(inputValue);

      // Update the event target value for React Hook Form
      const syntheticEvent = {
        ...ev,
        target: {
          ...ev.target,
          value: formatted
        }
      };

      if (!isControlled) {
        setInternalValue(formatted);
      }

      // Call React Hook Form's onChange with formatted value
      onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      
      // Call custom onValueChange callback
      onValueChange?.(formatted, raw);
    },
    [formatValue, isControlled, onChange, onValueChange]
  );

  // Format initial value if controlled
  const displayValue = React.useMemo(() => {
    if (isControlled && controlledValue) {
      return formatValue(String(controlledValue)).formatted;
    }
    return currentValue;
  }, [controlledValue, currentValue, formatValue, isControlled]);

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "focus:border-primary/20",
        className
      )}
      autoComplete="off"
      maxLength={money ? 15 : undefined}
      {...props}
      onChange={handleChange}
      value={displayValue}
    />
  );
}

export { WiseTextInput };
