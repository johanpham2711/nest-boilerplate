FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build

FROM node:18-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 8080
CMD [ "yarn", "start:prod" ]
