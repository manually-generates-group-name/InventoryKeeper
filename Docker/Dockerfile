# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /usr/src/app
COPY frontend/package*.json ./

RUN npm ci
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
