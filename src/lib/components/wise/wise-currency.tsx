"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/helpers";
import { useEffect, useReducer } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

export type InputCurrencyProps<T extends FieldValues> =
  React.ComponentProps<"input"> & {
    name: Path<T>;
    label?: string;
  };

function InputCurrency<T extends FieldValues>({
  name,
  label,
  ...props
}: InputCurrencyProps<T>) {
  const [value, setValue] = useReducer((_: string, next: string) => {
    if (!next) return "";
    const numericValue = Number(next.replace(/\D/g, ""));
    return numericValue ? formatMoney(numericValue) : "";
  }, "");

  return (
    <Input
      id={name}
      type="text"
      {...props}
      // {...field}
      onChange={(ev) => {
        const inputValue = ev.target.value;
        setValue(inputValue);
        const numericValue = Number(inputValue.replace(/\D/g, "")) / 100;
        //   field.onChange(numericValue || 0);
      }}
      value={value}
    />
  );
}

export default InputCurrency;
