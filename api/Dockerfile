FROM node:18.17.1-alpine as builder
WORKDIR /usr/src/app/
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm ci --omit=dev

FROM node:18.17.1-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY src /usr/src/app/src
COPY package.json /usr/src/app/
EXPOSE 3000
CMD ["node", "src/index.js"]