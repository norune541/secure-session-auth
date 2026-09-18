# Secure Session Auth

A full-stack authentication and session-management application built with TypeScript, Express, PostgreSQL, Prisma, React, and Docker.

The project focuses on the part of authentication that usually gets hand-waved away: managing long-lived user sessions, rotating refresh tokens, revoking individual sessions, and keeping an activity history for security-related events.

## Features

- Email or phone based login
- User registration and profile management
- Short-lived JWT access tokens
- Opaque refresh tokens generated with cryptographically secure random bytes
- Refresh-token rotation on every refresh
- SHA-256 hashed refresh tokens stored in PostgreSQL
- Server-side session expiration and revocation
- "Remember me" session lifetime control
- HttpOnly refresh-token cookie with `SameSite=Strict`
- Automatic `Secure` cookie flag in production
- Session metadata: IP address and detected device
- Per-session activity history
- Logout and individual session revocation
- Password change with bcrypt hashing
- Zod request and environment validation
- Centralized API error handling
- Shared TypeScript response types between frontend and backend
- Docker Compose setup with PostgreSQL, Express, React/Nginx, Prisma Studio, and optional seed data

## Authentication flow

The application separates short-lived access credentials from persistent refresh sessions.

1. The user signs in or registers.
2. The backend creates a random opaque refresh token.
3. Only the SHA-256 hash of the refresh token is stored in the `Session` table.
4. The raw refresh token is sent to the browser as an HttpOnly cookie.
5. A JWT access token is returned to the client. Access tokens expire after 1 minute.
6. When the access token expires, the client sends the refresh cookie to `POST /api/auth/sessions/refresh`.
7. The backend validates the stored refresh-token hash, issues a new access token, generates a new refresh token, and replaces the stored hash.
8. Logging out or revoking a session makes the server-side session unusable.

### Session lifetime

The `rememberMe` option controls the server-side session lifetime:

- `false`: 1 day
- `true`: 30 days

The access token remains short-lived in both cases.

## API

Base URL:

```text
/api
```

### Authentication and sessions

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/sessions` | No | Login and create a session |
| POST | `/auth/sessions/refresh` | Refresh cookie | Rotate refresh token and issue a new access token |
| DELETE | `/auth/sessions` | Bearer | Logout the current session |
| GET | `/auth/sessions` | Bearer | List active sessions for the current user |
| GET | `/auth/sessions/:sessionId` | Bearer | Get one active session |
| DELETE | `/auth/sessions/:sessionId` | Bearer | Revoke one session |
| GET | `/auth/sessions/activity` | Bearer | List session activity |
| GET | `/auth/sessions/activity/:activityId` | Bearer | Get one activity record |

### Users

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/users/` | No | Register a new user |
| GET | `/users/` | Bearer | Get the current user's profile |
| PATCH | `/users/` | Bearer | Update profile data |
| PATCH | `/users/password` | Bearer | Change the current password |

Protected endpoints use:

```http
Authorization: Bearer <access_token>
```

## Session data model

A user can have multiple active sessions. Each session contains:

- session ID
- user ID
- hashed refresh token
- IP address
- detected device
- creation time
- last update time
- expiration time
- revocation state

Session events are stored separately and linked to both the user and the session.

Current activity types include:

- `CREATED`
- `REFRESHED`
- `REVOKED`
- `EXPIRED`
- `PASSWORD_UPDATED`

The database uses indexes on `(userId, createdAt)` and `(sessionId, createdAt)` for activity queries.

## Tech stack

### Backend

- Node.js 24
- Express 5
- TypeScript
- PostgreSQL 15
- Prisma ORM
- Zod
- JSON Web Tokens
- bcrypt
- cookie-parser
- CORS
- Morgan

### Frontend

- React
- TypeScript
- Vite
- React Router
- Ant Design
- Recharts
- ky

### Infrastructure

- Docker
- Docker Compose
- Nginx
- Prisma Studio

### Shared code

The repository uses an npm workspace monorepo:

```text
.
├── backend/
├── frontend/
├── shared/
│   └── types/
├── compose.yaml
└── package.json
```

The `shared/types` workspace exposes common TypeScript response contracts used by both frontend and backend.

## Project structure

### Backend

```text
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── common/
    │   ├── errors/
    │   ├── middlewares/
    │   └── types/
    ├── config/
    ├── modules/
    │   ├── auth/
    │   └── user/
    └── server.ts
```

The authentication module contains the login, registration, token, session, DTO, controller, and route logic. User-specific profile and password operations live in the user module.

### Frontend

The React application is organized by features such as authentication, profile, and session management. Protected routes load the authenticated user's profile before rendering the application UI.

The session area includes:

- active session list
- per-session details and revocation
- activity log
- activity details
- profile/security controls

## Getting started

### Prerequisites

For local development:

- Node.js 24+
- npm
- PostgreSQL

For containerized execution:

- Docker
- Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/norune541/secure-session-auth.git
cd secure-session-auth
```

### 2. Configure environment variables

Create:

- `backend/.env` for local development
- `backend/.env.docker` for Docker Compose

Use `backend/.env.example` as a template.

Example local configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=public"
PORT=3000
ACCESS_SECRET=your_jwt_access_secret
NODE_ENV=development
```

For Docker, the PostgreSQL connection must point to the Compose service:

```env
DATABASE_URL="postgresql://postgres:secure_password_123@postgres:5432/app_db?schema=public"
```

Do not commit real secrets.

## Local development

Install dependencies from the repository root:

```bash
npm install
```

The backend is started before the frontend because the backend workspace builds the shared TypeScript types first.

### Start the backend

```bash
npm run backend:dev
```

Backend:

```text
http://localhost:3000
```

### Start the frontend

In another terminal:

```bash
npm run frontend:dev
```

Frontend:

```text
http://localhost:5173
```

### Seed development data

```bash
npm run seed:dev
```

The development seed recreates users with Faker data and the shared password:

```text
password
```

This seed is intended for local development only.

### Prisma Studio

```bash
npx prisma studio --schema backend/prisma/schema.prisma
```

By default Prisma Studio runs on:

```text
http://localhost:5555
```

## Docker Compose

The Compose configuration starts:

- PostgreSQL
- backend API
- React/Nginx frontend
- Prisma Studio

Build the images:

```bash
docker compose --env-file ./backend/.env.docker build
```

Start the application:

```bash
docker compose up
```

The backend container runs Prisma migrations before starting the API.

Services:

- Frontend: http://localhost
- Backend API through Nginx: http://localhost/api/
- Prisma Studio: http://localhost:5555

Prisma Studio is bound to `127.0.0.1` in Compose and is intended for local inspection.

### Seed Docker data

After the containers are running:

```bash
docker compose --profile seed run --rm seed
```

## Frontend and API proxy

In the Docker setup, Nginx serves the React application and proxies `/api/` requests to the backend container.

```text
Browser
   │
   ▼
Nginx :80
   ├── /        → React application
   └── /api/*   → Express :3000
                     │
                     ▼
                 PostgreSQL
```

This keeps the frontend and API under the same public origin in the containerized environment.

## Security design

The project intentionally keeps the refresh token out of the JavaScript-accessible browser storage.

Refresh tokens are:

1. generated with `crypto.randomBytes(32)`
2. sent to the client as an HttpOnly cookie
3. hashed with SHA-256 before database storage
4. replaced during refresh
5. invalidated server-side when a session is revoked

Passwords are hashed with bcrypt before being stored.

Input validation is handled with Zod, including authentication DTOs and runtime environment variables.

## Development commands

From the repository root:

| Command | Description |
| --- | --- |
| `npm run backend:dev` | Start backend in watch mode |
| `npm run backend:build` | Build shared types and backend |
| `npm run backend:start` | Start compiled backend |
| `npm run frontend:dev` | Start Vite development server |
| `npm run frontend:build` | Build frontend |
| `npm run frontend:preview` | Preview production frontend build |
| `npm run seed:dev` | Seed development database |
| `npm run types` | Build shared TypeScript types |
| `npm run lint` | Type-check and lint backend and frontend |
| `npm run format` | Format the repository with Prettier |

## Status

This is a pet project focused on authentication, session management, and security-oriented application architecture. It is intended as a demonstration of implementation and engineering decisions rather than a turnkey production authentication service.

The codebase includes the core session lifecycle and security mechanisms, while production deployments would still require environment-specific controls such as rate limiting, secret management, monitoring, and infrastructure hardening.

## License

This project is for educational and portfolio purposes.
