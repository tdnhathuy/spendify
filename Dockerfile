# -------- deps --------
    FROM node:20-alpine AS deps
    WORKDIR /app
    # Prisma trên Alpine cần các thư viện này
    RUN apk add --no-cache libc6-compat openssl
    # Bật PNPM qua corepack
    RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
    
    # Chỉ copy file cần để cache tốt
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    # -------- builder --------
    FROM node:20-alpine AS builder
    WORKDIR /app
    RUN apk add --no-cache libc6-compat openssl
    RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
    ENV NEXT_TELEMETRY_DISABLED=1
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    # Tạo Prisma Client trước khi build
    RUN pnpm prisma generate
    # Build Next.js (yêu cầu output standalone — xem lưu ý bên dưới)
    RUN pnpm build
    
    # -------- runner --------
    FROM node:20-alpine AS runner
    WORKDIR /app
    RUN apk add --no-cache libc6-compat openssl
    RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV PORT=3000
    
    # Copy output standalone & static
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    # Nếu app cần đọc schema ở runtime:
    COPY --from=builder /app/prisma ./prisma
    
    EXPOSE 3000
    
    # (Tuỳ chọn) chạy migrate trước khi start.
    # Nếu bạn chạy migrate ở hook khác, đổi lại CMD ["node","server.js"] là đủ.
    CMD pnpm dlx prisma migrate deploy && node server.js
    