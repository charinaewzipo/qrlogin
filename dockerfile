# === Builder
FROM node:16-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /unfinity

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY nx.json tsconfig.base.json ./
COPY apps/unfinity ./apps/unfinity
COPY libs ./libs
COPY types ./types

RUN pnpm build

# === Runner
FROM node:16-alpine AS runner
WORKDIR /unfinity
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /unfinity/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /unfinity/dist/apps/unfinity ./
USER nextjs