FROM oven/bun:1.1.13

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma generate && bun run --hot src/app.ts"]
