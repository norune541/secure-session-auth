FROM node:24-alpine AS builder

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY package.json package-lock.json ./

COPY backend/package.json ./backend/package.json
COPY shared/types/package.json ./shared/types/package.json

RUN npm ci

COPY backend ./backend

COPY shared/types/src ./shared/types/src
COPY shared/types/tsconfig.json ./shared/types/tsconfig.json

RUN npm run backend:build


FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

COPY backend/package.json ./backend/package.json
COPY shared/types/package.json ./shared/types/package.json

RUN npm ci --omit=dev

COPY --from=builder /app/backend/node_modules/.prisma ./backend/node_modules/.prisma
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma
COPY --from=builder /app/backend/prisma.config.ts ./backend/prisma.config.ts

EXPOSE 3000

CMD ["sh", "-c", "cd backend && npx prisma migrate deploy && npm start"]