# TransactionItem Compound Component - Final Structure

## 📁 Folder Structure

```
compounds/
├── index.ts                    # Main export file
├── root.tsx                    # Root component with context & styling
├── layouts.tsx                 # Layout wrapper components
├── base-tag.compound.tsx       # Base tag component
├── actions.compound.tsx        # Actions popover
├── amount.compound.tsx         # Amount display
├── category-tag.compound.tsx   # Category tag
├── description.compound.tsx    # Description & date
├── icon.compound.tsx          # Transaction icon
├── split-tag.compound.tsx     # Split tag
├── title.compound.tsx         # Transaction title
├── wallet-tag.compound.tsx    # Wallet tag
└── list-trans-popover.action.tsx # Popover actions hook
```

## 🎯 Usage

### Basic Usage
```tsx
import { TransactionItem } from "./compounds";

<TransactionItem transaction={transaction}>
  <TransactionItem.Icon />
  
  <TransactionItem.Content>
    <TransactionItem.Header>
      <TransactionItem.Tags>
        <TransactionItem.Title />
        <TransactionItem.CategoryTag />
        <TransactionItem.WalletTag />
        <TransactionItem.SplitTag />
      </TransactionItem.Tags>
      <TransactionItem.Actions />
    </TransactionItem.Header>

    <TransactionItem.Footer>
      <TransactionItem.Description />
      <TransactionItem.Amount />
    </TransactionItem.Footer>
  </TransactionItem.Content>
</TransactionItem>
```

### Alternative Layouts

#### Compact Layout
```tsx
<TransactionItem transaction={transaction}>
  <TransactionItem.Icon />
  <TransactionItem.Content>
    <TransactionItem.Header>
      <TransactionItem.Title />
      <TransactionItem.Amount />
    </TransactionItem.Header>
  </TransactionItem.Content>
</TransactionItem>
```

#### Card Layout
```tsx
<TransactionItem transaction={transaction}>
  <div className="flex flex-col w-full">
    <TransactionItem.Header>
      <TransactionItem.Title />
      <TransactionItem.Actions />
    </TransactionItem.Header>
    
    <div className="flex items-center gap-3">
      <TransactionItem.Icon />
      <TransactionItem.Tags>
        <TransactionItem.CategoryTag />
        <TransactionItem.WalletTag />
      </TransactionItem.Tags>
    </div>
    
    <TransactionItem.Footer>
      <TransactionItem.Description />
      <TransactionItem.Amount />
    </TransactionItem.Footer>
  </div>
</TransactionItem>
```

## 🧩 Available Components

### Layout Components
- `TransactionItem` - Root component (provides context & container styling)
- `TransactionItem.Content` - Main content wrapper
- `TransactionItem.Header` - Header section
- `TransactionItem.Tags` - Tags container
- `TransactionItem.Footer` - Footer section

### Data Components
- `TransactionItem.Icon` - Transaction/category icon
- `TransactionItem.Title` - Transaction title
- `TransactionItem.Amount` - Amount with color coding
- `TransactionItem.Description` - Description and date

### Interactive Components
- `TransactionItem.Actions` - Action buttons popover
- `TransactionItem.CategoryTag` - Category assignment tag
- `TransactionItem.WalletTag` - Wallet assignment tag
- `TransactionItem.SplitTag` - Split transaction tag

## ✅ Benefits

1. **Flexibility**: Create different layouts easily
2. **Composition**: Mix and match components as needed
3. **Maintainability**: Each component is focused and independent
4. **Performance**: All optimizations preserved (memo, useMemo, useCallback)
5. **Type Safety**: Full TypeScript support with context typing
6. **Consistent Styling**: Shared context ensures consistent behavior

## 🔧 Technical Details

- **Context**: All components share transaction data via React Context
- **Performance**: Components are memoized to prevent unnecessary re-renders
- **Styling**: Consistent styling through shared context and props
- **Events**: Proper event handling with stopPropagation where needed
