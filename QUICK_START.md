# Quick Start - Prisma Database Commands

## 🚀 Đơn giản nhất - Dành cho Development

```bash
# 1. Sửa file prisma/schema.prisma
# 2. Chạy lệnh này:
pnpm db:push
```

**Xong! Không cần làm gì thêm.** ✨

---

## 📝 Khi nào dùng gì?

### **Đang code, thử nghiệm** (90% thời gian)
```bash
pnpm db:push
```
- Nhanh nhất
- Không bị drift
- Không cần migration files

### **Sắp commit code** (khi muốn lưu lại lịch sử)
```bash
pnpm db:migrate
# Nhập tên migration, ví dụ: add_transfer_feature
```

### **Mở database UI để xem data**
```bash
pnpm db:studio
```

### **Reset database** (xóa hết data, bắt đầu lại)
```bash
pnpm db:reset
```

---

## 🎯 Workflow hàng ngày của bạn

```bash
# Buổi sáng: Pull code
git pull
pnpm install

# Làm việc: Sửa schema
# Edit prisma/schema.prisma
pnpm db:push

# Chiều: Commit code (nếu cần migration history)
pnpm db:migrate
git add .
git commit -m "feat: add new feature"
```

---

## 🆘 Gặp lỗi?

### "Drift detected"
```bash
pnpm db:push
```
Xong!

### "Migration already applied"
```bash
pnpm db:reset
```
⚠️ Lưu ý: Lệnh này xóa hết data

---

## 💡 Kết luận

**99% thời gian chỉ cần:**
```bash
pnpm db:push
```

Đơn giản vậy thôi! 🎉

