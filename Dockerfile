# ---------- deps ----------
    FROM node:20-alpine AS deps
    WORKDIR /app
    COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
    # chọn 1 trình quản lý gói bạn đang dùng:
    RUN if [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile; \
        elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
        else npm ci; fi
    
    # ---------- builder ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    ENV NEXT_TELEMETRY_DISABLED=1
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    # tạo prisma client ở build-time
    RUN npx prisma generate
    # build Next.js ở chế độ standalone
    RUN if [ -f pnpm-lock.yaml ]; then pnpm build; \
        elif [ -f yarn.lock ]; then yarn build; \
        else npm run build; fi
    
    # ---------- runner ----------
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    # copy output standalone & public assets
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    # copy prisma folder (nếu client cần schema tại runtime)
    COPY --from=builder /app/prisma ./prisma
    
    # cổng Next.js
    EXPOSE 3000
    
    # HEALTHCHECK (tuỳ chọn)
    HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000').then(()=>process.exit(0)).catch(()=>process.exit(1))"
    
    # chạy migrate ở startup (idempotent)
    CMD npx prisma migrate deploy && node server.js
    