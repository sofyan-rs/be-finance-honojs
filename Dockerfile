# Use the official Bun image
FROM oven/bun:1.1.13 as base

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of your application code
COPY . .

# Run Prisma client generation
RUN bunx prisma generate

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD ["bun", "run", "src/server.ts"]
