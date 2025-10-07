# ---------- builder ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # native deps hay cần (sharp, v.v.)
    RUN apk add --no-cache libc6-compat curl
    
    # PNPM
    RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
    
    # 1) Cài deps theo lockfile, KHÔNG chạy postinstall (tránh prisma generate sớm)
    COPY pnpm-lock.yaml package.json ./
    RUN pnpm install --frozen-lockfile --ignore-scripts
    
    # 2) Copy source
    COPY . .
    
    # 3) Re-install (vẫn bỏ postinstall)
    RUN pnpm install --frozen-lockfile --ignore-scripts
    
    # 4) Nếu có prisma/schema.prisma thì mới generate
    RUN [ -f prisma/schema.prisma ] \
      && pnpm exec prisma generate --schema=prisma/schema.prisma \
      || echo "No prisma/schema.prisma — skip prisma generate"
    
    # 5) Build Next
    RUN pnpm build
    
    # 6) Chỉ giữ production deps
    RUN pnpm prune --prod
    
    # ---------- runner ----------
    FROM node:20-alpine AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV PORT=3000
    ENV HOST=0.0.0.0
    
    # Tạo server.js ép bind 0.0.0.0 (dùng printf, KHÔNG heredoc)
    RUN printf '%s\n' \
    "const { createServer } = require('http');" \
    "const next = require('next');" \
    "const app = next({ dev: false });" \
    "const handle = app.getRequestHandler();" \
    "const port = parseInt(process.env.PORT||'3000',10);" \
    "const host = process.env.HOST || '0.0.0.0';" \
    "app.prepare().then(()=>{" \
    "  createServer((req,res)=>handle(req,res)).listen(port, host, err=>{" \
    "    if(err) throw err;" \
    "    console.log('> Ready on http://'+host+':'+port);" \
    "  });" \
    "});" > server.js
    
    # copy artefacts + prod node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    EXPOSE 3000
    RUN apk add --no-cache curl
    HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD curl -fsS http://127.0.0.1:3000/ || exit 1
    
    CMD ["node", "server.js"]
    