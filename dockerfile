# === Builder
FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /ku

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY nx.json tsconfig.base.json ./
COPY apps/ku ./apps/ku
COPY libs ./libs
COPY types ./types

RUN pnpm build

# === Runner
FROM node:16-alpine AS runner
WORKDIR /ku
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /ku/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /ku/dist/apps/ku ./
USER nextjs