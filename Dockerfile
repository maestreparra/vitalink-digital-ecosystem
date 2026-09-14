# Build stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Angular app (prerenders all public routes + bundles the SSR server)
RUN npm run build

# Production stage
FROM node:22-slim

WORKDIR /app
ENV NODE_ENV=production

# Copy built app from builder:
# - dist/browser: prerendered HTML + static assets (robots.txt, sitemap.xml, ...)
# - dist/server:  self-contained Node SSR server (dependencies are bundled by the Angular build)
COPY --from=builder /app/dist ./dist

# Default to port 8080 for managed container platforms, while allowing overrides.
ENV PORT=8080

EXPOSE $PORT

# Angular SSR server: serves prerendered HTML for Google/crawlers,
# static files from dist/browser, and returns real 404s for unknown routes
CMD ["node", "dist/server/server.mjs"]
