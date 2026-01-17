# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY backend/package*.json ./
COPY backend/prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client
RUN npm run prisma:generate

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init (para manejar señales correctamente)
RUN apk add --no-cache dumb-init

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copy application code
COPY backend/src ./src
COPY backend/.env.example ./.env.example
COPY backend/prisma/seed.js ./prisma/seed.js

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the app (run migration first, then seed, then start server)
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed-users.js && node src/server.js"]
