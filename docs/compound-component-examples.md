# TransactionItem Compound Component Examples

## Default Layout (Current)
```tsx
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

## Compact Layout
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

## Detailed Layout
```tsx
<TransactionItem transaction={transaction}>
  <TransactionItem.Icon />
  
  <TransactionItem.Content>
    <TransactionItem.Header>
      <TransactionItem.Title />
      <TransactionItem.Actions />
    </TransactionItem.Header>
    
    <TransactionItem.Tags>
      <TransactionItem.CategoryTag />
      <TransactionItem.WalletTag />
      <TransactionItem.SplitTag />
    </TransactionItem.Tags>

    <TransactionItem.Footer>
      <TransactionItem.Description />
      <TransactionItem.Amount />
    </TransactionItem.Footer>
  </TransactionItem.Content>
</TransactionItem>
```

## Card Layout
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

## Mobile Layout
```tsx
<TransactionItem transaction={transaction}>
  <TransactionItem.Content>
    <TransactionItem.Header>
      <div className="flex items-center gap-2">
        <TransactionItem.Icon />
        <TransactionItem.Title />
      </div>
      <TransactionItem.Amount />
    </TransactionItem.Header>
    
    <TransactionItem.Footer>
      <TransactionItem.CategoryTag />
      <TransactionItem.WalletTag />
    </TransactionItem.Footer>
  </TransactionItem.Content>
</TransactionItem>
```

## Benefits

1. **Flexibility**: Easy to create different layouts for different use cases
2. **Composition**: Mix and match components as needed
3. **Maintainability**: Each component is focused and easy to maintain
4. **Performance**: All optimizations (memo, useMemo, useCallback) are preserved
5. **Type Safety**: Full TypeScript support with proper context typing
