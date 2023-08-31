# builder
FROM node as builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build


# worker
FROM node:slim
USER node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY --from=builder /usr/src/app/build ./build

EXPOSE 3000
CMD ["npm", "start"]