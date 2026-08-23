FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/package.json
COPY shared/types/package.json ./shared/types/package.json

RUN npm ci

COPY frontend ./frontend
COPY shared/types/src ./shared/types/src
COPY shared/types/tsconfig.json ./shared/types/tsconfig.json

RUN npm run types
RUN npm run frontend:build


FROM nginx:alpine

COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]