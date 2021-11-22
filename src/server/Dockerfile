FROM node:17-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
VOLUME ["/usr/src/app/public"]

ENV PORT=3000

ENTRYPOINT["npm", "run"]
CMD["start"]

EXPOSE $PORT