FROM node:18-buster AS builder

WORKDIR /app
COPY package.json ./
RUN npm i 
COPY . .
RUN npm run build

FROM node:18-buster

WORKDIR /app
COPY package.json ./
RUN npm i --production

COPY --from=builder /app/dist ./dist
COPY .env ./
EXPOSE 50051
CMD ["node", "dist/app.js"]