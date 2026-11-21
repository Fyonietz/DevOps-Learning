FROM oven/bun:1-alpine
WORKDIR /app

# Install dependencies lebih dulu agar ter-cache oleh Docker layer
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy seluruh source code frontend (server.ts, index.html, src/)
COPY . .

ENV PORT=5000
EXPOSE 5000
CMD ["bun", "run", "server.ts"]
