# BE Finance Tracker HonoJS

This is a backend service for a finance tracker application built using HonoJS + PostgreSQL.

## Development

Install dependencies:

```sh
bun install
```

Run migrations:

```sh
bunx prisma migrate dev
```

Run development:

```sh
bun run dev
```

### Using Docker

Compose the docker image:

```sh
docker compose -f docker-compose.dev.yml up --build
```

Open http://localhost:3000
