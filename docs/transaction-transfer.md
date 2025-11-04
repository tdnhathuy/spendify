# Transaction Transfer Feature

## Tổng quan

Feature Transfer cho phép chuyển tiền giữa các ví trong cùng 1 tài khoản. Khác với Split (chia bill giữa nhiều người), Transfer chuyển toàn bộ số tiền từ ví này sang ví khác.

## Database Schema

### Model: TransactionTransfer

```prisma
model TransactionTransfer {
  id            String      @id @default(uuid())
  idWalletFrom  String      // NOT NULL - Ví nguồn (bắt buộc)
  idWalletTo    String      // NOT NULL - Ví đích (bắt buộc)
  amount        Float       // Số tiền chuyển
  fee           Float       @default(0) // Phí chuyển khoản
  idTransaction String      @unique // 1-1 với Transaction
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  idUser        String
  
  // Relations
  transaction   Transaction @relation(...)
  user          User        @relation(...)
  fromWallet    Wallet      @relation("TransferFromWallet", ...)
  toWallet      Wallet      @relation("TransferToWallet", ...)
}
```

### Constraints

1. **NOT NULL wallets**: `idWalletFrom` và `idWalletTo` bắt buộc phải có giá trị
2. **Unique Transaction**: Mỗi Transaction chỉ có thể có 1 Transfer (relation 1-1)
3. **Mutual Exclusion**: Transaction không thể có cả Splits và Transfer

## API Functions

### 1. markTransfer

Đánh dấu một transaction là transfer giữa 2 ví.

**Signature:**
```typescript
interface PayloadMarkTransfer {
  idTransaction: string;
  idWalletTo: string;
  amount: number;
  fee?: number; // Default: 0
}

markTransfer(params: PayloadMarkTransfer): Promise<TransactionTransfer>
```

**Logic:**
1. Validate transaction tồn tại và có `idWallet` (ví nguồn)
2. Validate transaction không có splits
3. Validate transaction chưa có transfer
4. Validate không transfer sang cùng 1 ví
5. Tạo `TransactionTransfer` record
6. Update balance:
   - Ví nguồn: `-= (amount + fee)`
   - Ví đích: `+= amount`

**Ví dụ:**
```typescript
const transfer = await markTransfer({
  idTransaction: "xxx",
  idWalletTo: "wallet-2-id",
  amount: 100000,
  fee: 1000, // Phí 1000
});
// Wallet 1: -101000
// Wallet 2: +100000
```

### 2. removeTransfer

Xóa transfer và hoàn lại balance cho 2 ví.

**Signature:**
```typescript
interface PayloadRemoveTransfer {
  idTransaction: string;
}

removeTransfer(params: PayloadRemoveTransfer): Promise<boolean>
```

**Logic:**
1. Lấy thông tin transfer
2. Xóa `TransactionTransfer` record
3. Hoàn lại balance:
   - Ví nguồn: `+= (amount + fee)`
   - Ví đích: `-= amount`

**Ví dụ:**
```typescript
await removeTransfer({
  idTransaction: "xxx",
});
// Balance được hoàn lại như ban đầu
```

## Business Rules

### 1. Split vs Transfer

| Feature | Split | Transfer |
|---------|-------|----------|
| **Use case** | Chia bill giữa nhiều người | Chuyển tiền giữa ví của cùng 1 người |
| **Wallets** | Optional (có thể null) | Required (NOT NULL) |
| **Quantity** | Nhiều splits cho 1 transaction | 1 transfer cho 1 transaction |
| **Balance update** | Phức tạp, tùy vào từng split | Đơn giản: trừ From, cộng To |
| **Fee** | Không | Có thể có phí |

### 2. Validation Rules

#### Transaction phải có wallet nguồn
```typescript
if (!transaction.idWallet) {
  throw new Error("Transaction must have a wallet to create transfer");
}
```

#### Không được có splits
```typescript
if (transaction.splits.length > 0) {
  throw new Error("Cannot create transfer for transaction with splits");
}
```

#### Không được có transfer trước đó
```typescript
if (transaction.transfer) {
  throw new Error("Transaction already has a transfer");
}
```

#### Không chuyển sang cùng 1 ví
```typescript
if (transaction.idWallet === idWalletTo) {
  throw new Error("Cannot transfer to the same wallet");
}
```

### 3. Ngược lại: Split cũng validate Transfer

Trong `splitTransaction()`:
```typescript
if (transaction.transfer) {
  throw new Error("Cannot create split for transaction with transfer");
}
```

## Ví dụ thực tế

### Scenario 1: Chuyển tiền từ ví tiền mặt sang tài khoản ngân hàng

```typescript
// Bước 1: Tạo transaction ban đầu (ví tiền mặt)
const transaction = await createTransaction({
  amount: 500000,
  idWallet: "cash-wallet-id", // Ví tiền mặt
  note: "Gửi tiền vào ngân hàng",
  // ...
});

// Bước 2: Đánh dấu là transfer
await markTransfer({
  idTransaction: transaction.id,
  idWalletTo: "bank-wallet-id",
  amount: 500000,
  fee: 0, // Không có phí
});

// Kết quả:
// - Cash wallet: -500,000
// - Bank wallet: +500,000
```

### Scenario 2: Chuyển tiền có phí

```typescript
await markTransfer({
  idTransaction: "xxx",
  idWalletTo: "other-bank-id",
  amount: 1000000,
  fee: 5000, // Phí chuyển khoản liên ngân hàng
});

// Kết quả:
// - Wallet nguồn: -1,005,000 (trừ cả phí)
// - Wallet đích: +1,000,000 (chỉ nhận amount)
```

### Scenario 3: Hủy transfer

```typescript
// Nếu chuyển nhầm, có thể hủy
await removeTransfer({
  idTransaction: "xxx",
});

// Balance được hoàn lại như ban đầu
```

## Migration Guide

Nếu bạn đã có data cũ và cần migrate:

1. **Backup database** trước khi chạy migration
2. Chạy `prisma db push` hoặc `prisma migrate dev`
3. Data cũ trong `TransactionTransfer` (nếu có) sẽ bị lỗi nếu `idWalletFrom` hoặc `idWalletTo` là NULL
4. Cần clean up hoặc fix data trước khi migrate:

```sql
-- Xóa các transfer không hợp lệ
DELETE FROM "TransactionTransfer" 
WHERE "idWalletFrom" IS NULL OR "idWalletTo" IS NULL;
```

## Testing Checklist

- [ ] Tạo transfer thành công với fee = 0
- [ ] Tạo transfer thành công với fee > 0
- [ ] Balance được update đúng (nguồn trừ, đích cộng)
- [ ] Không thể tạo transfer nếu transaction đã có splits
- [ ] Không thể tạo split nếu transaction đã có transfer
- [ ] Không thể tạo transfer nếu transaction không có wallet
- [ ] Không thể transfer sang cùng 1 ví
- [ ] Xóa transfer hoàn lại balance đúng
- [ ] Transaction với transfer không thể tạo thêm transfer nữa (unique constraint)

## Future Enhancements

1. **Recurring transfers**: Tự động chuyển tiền định kỳ
2. **Transfer history**: Lịch sử chuyển tiền với filtering
3. **Transfer limits**: Giới hạn số tiền có thể chuyển
4. **Multi-currency transfer**: Hỗ trợ chuyển đổi giữa các loại tiền tệ khác nhau
5. **Transfer approval**: Yêu cầu xác nhận trước khi chuyển (2FA)

