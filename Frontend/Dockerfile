# Stage 1: Build React TSX ke JavaScript statis menggunakan Bun di GitHub Actions
FROM oven/bun:1-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun build ./src/Main.tsx --outdir ./dist --target browser --format esm

# Stage 2: Serve langsung pakai Nginx Alpine (0 ketergantungan CPU SSE4.2)
FROM nginx:alpine
COPY --from=build /app/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/dist/Main.js /usr/share/nginx/html/Main.js
EXPOSE 80
