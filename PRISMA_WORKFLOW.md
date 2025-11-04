# Prisma Workflow Guide

## 🔥 Quick Reference

```bash
# Development: Thay đổi schema thường xuyên
npm run db:push

# Production/Commit: Tạo migration thật
npm run db:migrate

# Reset database (mất data)
npm run db:reset
```

---

## 📋 Chi tiết Workflow

### 1️⃣ **Development Mode** (Đang code, thử nghiệm)

**Khi nào dùng:**
- Thử nghiệm schema design
- Thêm/xóa field thường xuyên
- Chưa cần commit code
- Database local, data không quan trọng

**Commands:**
```bash
# 1. Sửa schema.prisma
# 2. Push changes
npx prisma db push

# Hoặc xem preview trước
npx prisma db push --preview-feature
```

**Lưu ý:**
- ✅ Nhanh, đơn giản
- ❌ Không có migration history
- ❌ Không rollback được

---

### 2️⃣ **Production Mode** (Commit code, deploy)

**Khi nào dùng:**
- Sắp commit code
- Deploy lên staging/production
- Cần migration history
- Làm việc với team

**Commands:**
```bash
# 1. Sửa schema.prisma
# 2. Tạo migration
npx prisma migrate dev --name <descriptive-name>

# Example:
npx prisma migrate dev --name add_transfer_feature
```

**Migration được commit vào Git:**
```
prisma/
  migrations/
    20241104_add_transfer_feature/
      migration.sql
```

---

### 3️⃣ **Fix Drift Issues**

#### Option A: Reset Database (Mất data)
```bash
# Xóa data, chạy lại migrations từ đầu
npx prisma migrate reset

# Sau đó chạy lại migrations
npx prisma migrate deploy
```

#### Option B: Baseline (Giữ data)
```bash
# 1. Xóa migrations cũ
rm -rf prisma/migrations

# 2. Push schema (giữ data)
npx prisma db push

# 3. Tạo baseline migration
mkdir -p prisma/migrations/0_init
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0_init/migration.sql

# 4. Mark as applied
npx prisma migrate resolve --applied 0_init
```

---

## 🛠️ NPM Scripts Setup

Thêm vào `package.json`:

```json
{
  "scripts": {
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:create": "prisma migrate dev --create-only",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:reset": "prisma migrate reset",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    
    "db:baseline": "sh scripts/prisma-baseline.sh",
    
    "postinstall": "prisma generate"
  }
}
```

**Sử dụng:**
```bash
npm run db:push           # Development
npm run db:migrate        # Production
npm run db:reset          # Reset everything
npm run db:baseline       # Fix drift giữ data
```

---

## 📊 Comparison Table

| Command | Use Case | Migration Files | Data Loss | Rollback | Team Sync |
|---------|----------|----------------|-----------|----------|-----------|
| `db push` | Dev, prototyping | ❌ Không | ⚠️ Có thể | ❌ Không | ❌ Khó |
| `migrate dev` | Production, commit | ✅ Có | ❌ Không | ✅ Có | ✅ Dễ |
| `migrate reset` | Fix issues | ✅ Có | ⚠️ Có | ✅ Có | ✅ Dễ |
| `db:baseline` | Fix drift | ✅ Có | ❌ Không | ⚠️ Limited | ✅ Dễ |

---

## 🎯 Recommended Workflow

### Solo Developer (bạn hiện tại)

```bash
# 1. Đang dev → push nhanh
npx prisma db push

# 2. Muốn commit → tạo migration
npx prisma migrate dev --name feature_name

# 3. Bị drift → baseline
npm run db:baseline
```

### Team Development

```bash
# 1. Pull code từ team
git pull

# 2. Apply migrations
npx prisma migrate deploy

# 3. Sửa schema
# Edit schema.prisma

# 4. Tạo migration
npx prisma migrate dev --name your_feature

# 5. Commit migration
git add prisma/migrations
git commit -m "feat: add transfer feature"
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Drift detected"
```bash
# Solution 1: Reset (mất data)
npx prisma migrate reset

# Solution 2: Baseline (giữ data)
npm run db:baseline
```

### Issue 2: "Migration already applied"
```bash
# Mark migration as rolled back
npx prisma migrate resolve --rolled-back <migration-name>

# Then apply again
npx prisma migrate deploy
```

### Issue 3: Database out of sync
```bash
# Force push schema
npx prisma db push --accept-data-loss

# Then create new migration
npx prisma migrate dev --name sync_schema
```

---

## 💡 Best Practices

1. **Development**: Dùng `db push` cho tốc độ
2. **Before Commit**: Tạo migration với `migrate dev`
3. **Production**: Chỉ dùng `migrate deploy`
4. **Backup**: Backup DB trước khi reset
5. **Naming**: Migration names nên mô tả rõ ràng
   - ✅ `add_transfer_feature`
   - ✅ `update_user_email_unique`
   - ❌ `update1`, `fix`, `test`

---

## 🔐 Production Deployment

### Never use in Production:
- ❌ `prisma db push`
- ❌ `prisma migrate dev`
- ❌ `prisma migrate reset`

### Always use:
- ✅ `prisma migrate deploy`

### Deployment Script:
```bash
#!/bin/bash
# deploy.sh

# Pull latest code
git pull

# Install dependencies
npm ci

# Apply migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Build app
npm run build

# Restart app
pm2 restart app
```

---

## 📚 Further Reading

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Schema Prototyping](https://www.prisma.io/docs/guides/migrate/prototyping-schema-db-push)
- [Production Troubleshooting](https://www.prisma.io/docs/guides/migrate/production-troubleshooting)

