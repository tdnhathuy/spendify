# syntax=docker/dockerfile:1.7

########################################
# Base
########################################
FROM node:20-bookworm AS base
WORKDIR /app
ENV NODE_ENV=production
# Bật pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

########################################
# Deps (install node_modules với cache)
########################################
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store/v3 \
    pnpm i --frozen-lockfile

########################################
# Builder
########################################
FROM base AS builder
WORKDIR /app
# Copy toàn bộ mã nguồn
COPY . .
# Copy node_modules từ stage deps
COPY --from=deps /app/node_modules ./node_modules
# Build Next.js (bật output standalone trong next.config.js)
# next.config.js:  module.exports = { output: 'standalone' }
RUN pnpm build

########################################
# Runner (nhẹ, chỉ chạy app)
########################################
FROM node:20-bookworm AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Dùng user không phải root (có sẵn trong image node)
USER node

# Copy output dạng standalone
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
