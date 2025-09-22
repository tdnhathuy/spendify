// Import all components
import { Root } from "./root";
import { Content, Header, Tags, Footer } from "./layouts";
import { ListTransItemIcon as Icon } from "./icon.compound";
import { ListTransItemTitle as Title } from "./title.compound";
import { ListTransItemAmount as Amount } from "./amount.compound";
import { ListTransItemDesc as Description } from "./description.compound";
import { PopoverListTrans as Actions } from "./actions.compound";
import { TagAssignCategory as CategoryTag } from "./category-tag.compound";
import { TagAssignWallet as WalletTag } from "./wallet-tag.compound";
import { TagSplit as SplitTag } from "./split-tag.compound";

// Export individual components
export * from "./root";
export * from "./layouts";
export * from "./icon.compound";
export * from "./title.compound";
export * from "./amount.compound";
export * from "./description.compound";
export * from "./actions.compound";
export * from "./category-tag.compound";
export * from "./wallet-tag.compound";
export * from "./split-tag.compound";
export * from "./base-tag.compound";

// Create compound component
export const TransactionItem = Object.assign(Root, {
  // Layout components
  Content,
  Header,
  Tags,
  Footer,

  // Data components
  Icon,
  Title,
  Amount,
  Description,

  // Interactive components
  Actions,
  CategoryTag,
  WalletTag,
  SplitTag,
});
