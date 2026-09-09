FROM node:22-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY package.json ./
RUN pnpm install --no-frozen-lockfile
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Robust standalone asset alignment: Ensure static and public directories exist alongside server.js
RUN set -e; \
  find . -maxdepth 3 -name "server.js" -not -path "*/node_modules/*" | while read -r s; do \
    dir="$(dirname "$s")"; \
    if [ "$dir" != "." ]; then \
      mkdir -p "$dir/.next"; \
      cp -rn .next/static "$dir/.next/static" 2>/dev/null || true; \
      cp -rn public "$dir/public" 2>/dev/null || true; \
    fi; \
  done

EXPOSE 3017
ENV PORT=3017
ENV HOSTNAME=0.0.0.0
CMD ["sh", "-c", "if [ -f server.js ]; then node server.js; elif [ -f app/server.js ]; then cd app && node server.js; else TARGET=$(find . -maxdepth 3 -name server.js -not -path '*/node_modules/*' | head -n 1); cd $(dirname \"$TARGET\") && node server.js; fi"]
