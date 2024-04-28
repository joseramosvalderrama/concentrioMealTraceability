FROM node:18.17.1-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

FROM node:18.17.1-alpine AS build
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY src/ src
COPY public/ public
COPY package.json ./
COPY package-lock.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY vite.config.js ./
COPY index.html ./
COPY .env.production ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
EXPOSE 80
RUN chmod +x /docker-entrypoint.d/env.sh