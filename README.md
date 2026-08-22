# Session management

A clean and minimal initial setup for an Express, TypeScript, and PostgreSQL backend project featuring advanced session management, secure authentication flows, and token rotation.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL with Prisma
- **Validation:** Zod

## Getting Started

1. Clone the repository

2. Configure your environment variables by creating .env (for local development) and .env.docker (for containerized execution) files based on .env.example.

3. Start the infrastructure and application via Docker:

```bash
docker compose --env-file .env.docker up --build
```

4. Access the services:

Backend API: Available on the port specified in your configuration (3000 by default)

Prisma Studio: Available locally at http://localhost:5555 for database inspection and management.
