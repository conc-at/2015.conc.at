FROM node:10 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1-alpine

RUN mkdir -p /app
COPY CHECKS /app/CHECKS

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .

EXPOSE 80
