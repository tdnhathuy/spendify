import { memo, ReactNode } from "react";

// Layout wrapper components
export const Content = memo(({ children }: { children: ReactNode }) => (
  <span className="flex  w-full flex-col gap-2">{children}</span>
));

Content.displayName = "TransactionItemContent";

export const Header = memo(({ children }: { children: ReactNode }) => (
  <span className="flex flex-1 justify-between text-xs gap-3">{children}</span>
));

Header.displayName = "TransactionItemHeader";

export const Tags = memo(({ children }: { children: ReactNode }) => (
  <span className="flex gap-2 items-center">{children}</span>
));

Tags.displayName = "TransactionItemTags";

export const Footer = memo(({ children }: { children: ReactNode }) => (
  <span className="flex justify-between  gap-4">{children}</span>
));

Footer.displayName = "TransactionItemFooter";
