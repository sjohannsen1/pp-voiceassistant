FROM node:17-alpine

WORKDIR /usr/src
COPY sdk ./sdk

WORKDIR /usr/src/app
COPY client/package*.json ./
RUN npm install

COPY client/ .
VOLUME ["/usr/src/app/skills"]
RUN echo "{}" > ./skillConfigs.json

ENV PORT=2712
ENV LOCALE=de_DE
ENV SERVER=localhost:3000
ENV RHASSPY=localhost:12101
ENV MQTT=localhost:1883

ENTRYPOINT ["npm", "run"]
CMD ["start"]

EXPOSE $PORT