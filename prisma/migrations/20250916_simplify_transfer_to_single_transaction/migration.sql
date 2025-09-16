-- Migration: Simplify transfer to single transaction
-- Chuyển đổi từ 2 transactions per transfer sang 1 transaction duy nhất

-- Step 1: Thêm column mới cho transfer destination
ALTER TABLE "public"."Transaction" ADD COLUMN "idWalletTransferTo" TEXT;

-- Step 2: Migrate dữ liệu hiện có
-- Với mỗi TransactionTransfer, chuyển đổi thành 1 transaction duy nhất
DO $$
DECLARE
    transfer_record RECORD;
    from_transaction_record RECORD;
    to_transaction_record RECORD;
BEGIN
    -- Lặp qua tất cả TransactionTransfer
    FOR transfer_record IN 
        SELECT * FROM "public"."TransactionTransfer"
    LOOP
        -- Tìm transaction âm (wallet nguồn)
        SELECT * INTO from_transaction_record
        FROM "public"."Transaction" 
        WHERE "idTransfer" = transfer_record.id 
        AND amount < 0 
        LIMIT 1;
        
        -- Tìm transaction dương (wallet đích)  
        SELECT * INTO to_transaction_record
        FROM "public"."Transaction" 
        WHERE "idTransfer" = transfer_record.id 
        AND amount > 0 
        LIMIT 1;
        
        -- Nếu tìm thấy cả 2 transactions
        IF from_transaction_record.id IS NOT NULL AND to_transaction_record.id IS NOT NULL THEN
            -- Cập nhật transaction âm thành transaction transfer mới
            UPDATE "public"."Transaction" 
            SET 
                amount = ABS(from_transaction_record.amount), -- Chuyển thành dương
                "idWalletTransferTo" = to_transaction_record."idWallet", -- Wallet đích
                "idTransfer" = NULL -- Xóa reference cũ
            WHERE id = from_transaction_record.id;
            
            -- Xóa transaction dương (không cần nữa)
            DELETE FROM "public"."Transaction" 
            WHERE id = to_transaction_record.id;
            
            RAISE NOTICE 'Migrated transfer % (from: %, to: %)', 
                transfer_record.id, from_transaction_record.id, to_transaction_record.id;
        ELSE
            RAISE WARNING 'Invalid transfer % - missing transactions', transfer_record.id;
        END IF;
    END LOOP;
END $$;

-- Step 3: Xóa column idTransfer (không cần nữa)
ALTER TABLE "public"."Transaction" DROP COLUMN "idTransfer";

-- Step 4: Xóa bảng TransactionTransfer (không cần nữa)
DROP TABLE "public"."TransactionTransfer";

-- Step 5: Thêm foreign key constraint cho idWalletTransferTo
ALTER TABLE "public"."Transaction" 
ADD CONSTRAINT "Transaction_idWalletTransferTo_fkey" 
FOREIGN KEY ("idWalletTransferTo") REFERENCES "public"."Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Step 6: Thêm indexes cho performance
CREATE INDEX "Transaction_idWalletTransferTo_idx" ON "public"."Transaction"("idWalletTransferTo");
CREATE INDEX "Transaction_idUser_idWalletTransferTo_date_idx" ON "public"."Transaction"("idUser", "idWalletTransferTo", "date" DESC);
