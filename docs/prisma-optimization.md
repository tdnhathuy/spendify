# Tối ưu hóa Prisma Performance

## Vấn đề gặp phải
Trong môi trường dev, các query Prisma chạy rất chậm (~1s) so với production (<100ms).

## Nguyên nhân
1. **Hot Module Replacement (HMR)** trong Next.js dev mode tạo ra nhiều PrismaClient instances
2. Mỗi instance tạo connection pool mới → quá nhiều connections
3. Không có caching và connection reuse
4. Database connection không được optimize

## Giải pháp đã áp dụng

### 1. Singleton Pattern với Global Caching ✅
**File**: `src/server/prisma/prisma.server.ts`

```typescript
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Lợi ích**:
- Chỉ có 1 instance duy nhất trong dev mode
- Reuse connection pool giữa các lần HMR
- Giảm overhead từ việc tạo/hủy connections

### 2. Graceful Shutdown ✅
```typescript
if (process.env.NODE_ENV === "production") {
  const shutdownHandler = async () => {
    await client.$disconnect();
    process.exit(0);
  };
  process.on("SIGINT", shutdownHandler);
  process.on("SIGTERM", shutdownHandler);
}
```

**Lợi ích**:
- Đóng connections đúng cách khi shutdown
- Tránh connection leaks
- Production stability

### 3. Optimize DATABASE_URL ⚙️
Thêm các query parameters vào connection string:

```bash
# Development
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?connection_limit=5&pool_timeout=10&connect_timeout=5&statement_cache_size=100"

# Production
DATABASE_URL="postgresql://user:password@host:5432/dbname?connection_limit=20&pool_timeout=10&connect_timeout=5&statement_cache_size=100"
```

**Parameters**:
- `connection_limit=5`: Giới hạn connections (dev: 5, prod: 10-20)
- `pool_timeout=10`: Timeout chờ connection từ pool (10s)
- `connect_timeout=5`: Timeout khi connect tới DB (5s)
- `statement_cache_size=100`: Cache prepared statements

### 4. Reduce Log Overhead ✅
```typescript
log: process.env.NODE_ENV === "development" 
  ? ["error", "warn"]  // Chỉ log errors trong dev
  : ["error"]          // Chỉ log errors trong prod
```

## Cải thiện thêm (Nâng cao)

### 1. Sử dụng Connection Pooler
Với database scale lớn, sử dụng **PgBouncer** hoặc **Supabase Pooler**:

```bash
# Connection pooler URL
DATABASE_URL="postgresql://user:password@pooler-host:6543/dbname?pgbouncer=true"

# Direct connection (cho migrations)
DIRECT_URL="postgresql://user:password@db-host:5432/dbname"
```

Update `schema.prisma`:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 2. Query Optimization
- Luôn dùng `select` thay vì `include` khi có thể
- Chỉ select fields cần thiết
- Sử dụng indexes hiệu quả (đã có trong schema)

Ví dụ đã optimize trong project:
```typescript
export const selectTrans = {
  id: true,
  amount: true,
  note: true,
  date: true,
  category: { select: selectCategory },  // Nested select
  wallet: { select: selectWalletSimple },
  // ... only what we need
} satisfies Prisma.TransactionSelect;
```

### 3. Enable Query Cache (Experimental)
Thêm vào `prisma.server.ts`:
```typescript
import { withAccelerate } from '@prisma/extension-accelerate';

const client = new PrismaClient()
  .$extends(withAccelerate())  // Query caching
  .$extends(pagination());
```

### 4. Batch Queries
Dùng `$transaction` cho multiple queries:
```typescript
const [users, posts] = await prisma.$transaction([
  prisma.user.findMany(),
  prisma.post.findMany(),
]);
```

### 5. Monitor với Prisma Studio
```bash
pnpm prisma studio
```

## Kết quả mong đợi

| Environment | Before | After | Improvement |
|------------|--------|-------|-------------|
| Development | ~1000ms | <150ms | **85% faster** |
| Production | <100ms | <50ms | **50% faster** |

## Best Practices

1. ✅ **Luôn dùng singleton pattern** cho PrismaClient
2. ✅ **Optimize DATABASE_URL** với connection parameters
3. ✅ **Sử dụng select thay vì include** khi có thể
4. ✅ **Tạo indexes phù hợp** (đã có trong schema)
5. ✅ **Graceful shutdown** trong production
6. ⚠️ **Avoid N+1 queries** - dùng include/select đúng cách
7. ⚠️ **Monitor query performance** - enable query logging khi debug

## Debugging Performance

### Enable query logging:
```typescript
const client = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
  ],
});

client.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Duration: ' + e.duration + 'ms');
});
```

### Check connection pool:
```typescript
// Log pool metrics
console.log(await prisma.$metrics.json());
```

## References
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Next.js with Prisma](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
- [PostgreSQL Connection Pooling](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#external-connection-poolers)


