FROM node:17-alpine

WORKDIR /usr/src
COPY sdk ./sdk
RUN npm install sdk -g

WORKDIR /usr/src/app
COPY client/package*.json ./
RUN npm install -g

COPY client/ .
VOLUME ["/usr/src/app/skills"]
RUN echo "{}" > ./skillConfigs.json

ENV PORT=12102 \
    LOCALE=de_DE \
    SERVER=localhost:3000 \
    RHASSPY=localhost:12101 \
    MQTT=localhost:1883

ENTRYPOINT ["npm", "run"]
CMD ["start"]

EXPOSE $PORT