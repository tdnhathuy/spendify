# ---- deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev

# ---- build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Nếu bạn dùng "output: standalone" trong next.config, giữ nguyên lệnh build
RUN npm run build

# ---- run (siêu gọn với standalone)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# quan trọng: bắt Next bind 0.0.0.0 (tránh bind vào hostname container)
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# copy đúng 3 thứ cần cho standalone
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s CMD wget -qO- http://127.0.0.1:3000/ || exit 1
CMD ["node","server.js"]
