# useTransactionItem Hook

## 🎯 Purpose

Custom hook để truy cập transaction data từ TransactionItem context một cách type-safe và convenient.

## 📖 Usage

```tsx
import { useTransactionItem } from "./use-transaction-item";

const MyComponent = () => {
  const { 
    transaction,
    isTransfer,
    isIncome,
    isExpense,
    hasCategory,
    hasWallet,
    isValid,
    categoryName,
    categoryIcon,
    walletName,
    amount
  } = useTransactionItem();

  return (
    <div>
      <h3>{categoryName}</h3>
      <p>{isIncome ? 'Income' : isExpense ? 'Expense' : 'Transfer'}</p>
      <span className={isValid ? 'valid' : 'invalid'}>
        {formatMoney(amount)}
      </span>
    </div>
  );
};
```

## 🔧 API

### Return Values

#### Core Data
- `transaction: ITransaction` - Raw transaction object

#### Type Checks
- `isTransfer: boolean` - True if transaction is a transfer
- `isIncome: boolean` - True if transaction is income type
- `isExpense: boolean` - True if transaction is expense type

#### Validation
- `hasCategory: boolean` - True if transaction has category assigned
- `hasWallet: boolean` - True if transaction has wallet assigned
- `isValid: boolean` - True if both category and wallet are assigned

#### Features
- `hasSplits: boolean` - True if transaction has split records

#### Computed Values
- `categoryName: string` - Category name or "Uncategorized"
- `categoryIcon: string | undefined` - Category icon
- `walletName: string` - Wallet name or "No Wallet"
- `walletIcon: string | undefined` - Wallet icon
- `amount: Decimal` - Transaction amount
- `description: string | undefined` - Transaction description
- `date: Date` - Transaction date

## ✅ Benefits

### 1. **Type Safety**
```tsx
// ❌ Before: Manual useContext with potential errors
const context = useContext(ContextTransactionItem);
if (!context) {
  throw new Error('Context not found');
}
const { transaction } = context;

// ✅ After: Type-safe hook with error handling
const { transaction, isIncome } = useTransactionItem();
```

### 2. **Computed Values**
```tsx
// ❌ Before: Manual computation in every component
const isTransfer = !!transaction.transfer;
const isIncome = transaction.category?.type === "Income";
const categoryName = transaction.category?.name || "Uncategorized";

// ✅ After: Pre-computed values
const { isTransfer, isIncome, categoryName } = useTransactionItem();
```

### 3. **Error Handling**
```tsx
// Hook automatically throws error if used outside TransactionItem
// No need to check for null/undefined context
```

### 4. **Consistent API**
```tsx
// All components use the same hook with same API
// Easy to refactor and maintain
```

## 🚨 Error Handling

Hook will throw an error if used outside of TransactionItem component:

```tsx
// ❌ This will throw error
const SomeComponent = () => {
  const { transaction } = useTransactionItem(); // Error!
  return <div>...</div>;
};

// ✅ This works
<TransactionItem transaction={transaction}>
  <SomeComponent /> {/* Hook works here */}
</TransactionItem>
```

## 🔄 Before vs After

### Before (using useContext directly)
```tsx
const MyComponent = () => {
  const { transaction } = useContext(ContextTransactionItem);
  
  const isTransfer = !!transaction.transfer;
  const isIncome = transaction.category?.type === "Income";
  const categoryName = transaction.category?.name || "Uncategorized";
  
  return <div>{categoryName}</div>;
};
```

### After (using custom hook)
```tsx
const MyComponent = () => {
  const { isTransfer, isIncome, categoryName } = useTransactionItem();
  
  return <div>{categoryName}</div>;
};
```

## 🎯 Best Practices

1. **Use destructuring** to get only needed values
2. **Leverage computed values** instead of manual computation
3. **Use type checks** for conditional rendering
4. **Don't call outside** TransactionItem component tree
