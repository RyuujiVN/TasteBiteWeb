## Build stage ##
FROM node:20-alpine as deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM deps as build

WORKDIR /app

COPY . .
RUN npm run build && npm prune --omit=dev

## Run stage ##
FROM node:20-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]