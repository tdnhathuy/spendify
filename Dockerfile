# ---------- build ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # tiện cho 1 số native deps
    RUN apk add --no-cache libc6-compat curl
    
    # PNPM
    RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
    
    # 1) Cài deps nhưng KHÔNG chạy postinstall (tránh Prisma generate sớm)
    COPY pnpm-lock.yaml package.json ./
    RUN pnpm install --frozen-lockfile --ignore-scripts
    
    # 2) Copy toàn bộ source (giờ mới có thư mục prisma nếu có)
    COPY . .
    
    # 3) Re-install để link scripts nếu cần, NHƯNG vẫn bỏ qua postinstall
    RUN pnpm install --frozen-lockfile --ignore-scripts
    
    # 4) (Tuỳ) Generate Prisma NẾU có schema, còn không thì bỏ qua
    RUN [ -f prisma/schema.prisma ] \
      && pnpm exec prisma generate --schema=prisma/schema.prisma \
      || echo "No prisma/schema.prisma — skip prisma generate"
    
    # 5) Build Next (repo của bạn đã set output: 'standalone')
    RUN pnpm build
    
    # ---------- run ----------
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    # ép Next bind 0.0.0.0 (không dính bẫy HOSTNAME = tên container)
    ENV HOSTNAME=0.0.0.0
    ENV PORT=3000
    
    # copy đúng phần cần cho standalone
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    
    EXPOSE 3000
    # healthcheck cho chắc
    RUN apk add --no-cache curl
    HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD curl -fsS http://127.0.0.1:3000/ || exit 1
    
    # chạy server standalone của Next
    CMD ["node", ".next/standalone/server.js"]
    