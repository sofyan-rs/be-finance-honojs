# BE Finance Tracker HonoJS

This is a backend service for a finance tracker application built with HonoJS + PostgreSQL.

## Development

Install dependencies:

```sh
bun install
```

Run migrations:

```sh
bunx prisma generate
bunx prisma migrate dev
```

Run development:

```sh
bun run dev
```

### Using Docker

Compose the docker image:

```sh
docker compose up --build
```

## Documentation API

Visit here to see API Documentation: [API Docs](https://api-finance.sofyan.id/)
