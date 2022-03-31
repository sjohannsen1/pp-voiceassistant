FROM node:17

WORKDIR /usr/src
COPY sdk ./sdk
WORKDIR /usr/src/sdk
RUN npm install -g

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
    MQTTHOST=localhost \
    MQTTPORT=1883 \
    ZIGBEETOPIC=zigbee2mqtt

ENTRYPOINT ["npm", "run"]
CMD ["start"]

EXPOSE $PORT