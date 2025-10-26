# syntax=docker/dockerfile:1.7

FROM node:20-bookworm AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Install deps (cả devDeps để có prisma CLI)
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store/v3 \
    pnpm i --frozen-lockfile --prod=false

# Build
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm exec prisma generate
RUN pnpm build   # next.config.js: module.exports = { output: 'standalone' }

# Run (nhẹ)
FROM node:20-bookworm AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
USER node
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/src/generated/prisma ./src/generated/prisma
COPY --chown=node:node --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
