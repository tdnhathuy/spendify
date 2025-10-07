# ---------- deps ----------
    FROM node:20-alpine AS deps
    WORKDIR /app
    
    # bật pnpm qua corepack
    RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
    
    # copy lockfile + manifest trước để cache tốt
    COPY pnpm-lock.yaml package.json ./
    # nếu có: COPY .npmrc ./
    
    # cài deps (đúng theo lockfile)
    RUN pnpm install --frozen-lockfile
    
    # ---------- build ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    # build Next (repo của bạn đã set output: "standalone")
    RUN pnpm build
    
    # ---------- run ----------
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    # GẠT bẫy HOSTNAME của Docker: ép Next bind 0.0.0.0 thay vì tên container
    ENV HOSTNAME=0.0.0.0
    ENV PORT=3000
    
    # copy đúng các thư mục cần cho "standalone"
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    
    EXPOSE 3000
    # healthcheck tùy chọn
    RUN apk add --no-cache curl
    HEALTHCHECK --interval=30s --timeout=3s --start-period=15s CMD curl -fsS http://127.0.0.1:3000/ || exit 1
    
    # CHẠY server standalone của Next
    CMD ["node", ".next/standalone/server.js"]
    