# Session management

A clean and minimal initial setup for an Express, TypeScript, and PostgreSQL backend project featuring advanced session management, secure authentication flows, and token rotation.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL with Prisma
- **Validation:** Zod

## Getting Started

### Staging

Docker is used to run the application in a staging-like environment.

1. Clone the repository.

2. Configure your environment variables by creating `.env` (for local development) and `.env.docker` (for containerized execution) files based on `.env.example`.

3. Build the Docker images:

```bash
sudo docker compose --env-file ./backend/.env.docker build
```

4. Start the infrastructure and application:

```bash
sudo docker compose --env-file ./backend/.env.docker up
```

5. Run the database seeds (optional):

```bash
sudo docker compose --profile seed run --rm --no-deps seed
```

6. Access the services:

- **Frontend:** http://localhost:80
- **Backend API:** http://localhost:3000
- **Prisma Studio:** http://localhost:5555

Prisma Studio is available locally for database inspection and management.

### Development

For local development, run the backend and frontend directly in development mode.

**The order is important:** start the backend first, then the frontend. The backend compiles the TypeScript types required by the frontend, while the frontend does not perform this compilation.

1. Start the backend:

```bash
npm run backend:dev
```

2. Start the frontend:

```bash
npm run frontend:dev
```

3. Run the database seeds (optional):

```bash
npm run seed:dev
```
