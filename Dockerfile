# builder
FROM node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]