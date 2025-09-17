import * as React from "react";

import { cn } from "@/lib/utils";

function WiseTextArea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[0.5px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "resize-none",
        className
      )}
      {...props}
    />
  );
}

export { WiseTextArea };
