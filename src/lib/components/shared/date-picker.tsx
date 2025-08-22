import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  children: React.ReactNode;
}

export const DatePicker = ({ value, onChange, children }: DatePickerProps) => {
  console.log("value", value);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>

      <PopoverContent className="p-0 w-72 ">
        <Calendar
          fixedWeeks
          mode="single"
          navLayout="after"
          selected={value}
          onSelect={(date) => {
            date && onChange(date);
            setIsOpen(false);
          }}
          className="w-full"
          styles={{
            week: { marginTop: 0 },
            weekdays: { marginBottom: 6 },
            weekday: { fontSize: "15px", fontWeight: "500" },
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
