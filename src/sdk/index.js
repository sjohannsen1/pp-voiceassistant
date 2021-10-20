const mqtt = require("mqtt");
let client;

let configObject = {
    mqtt: 'localhost',
    intentHandler: () => {}
}

let sessionData = {
    siteId: "default",
    sessionId: ""
};

function config(options = {}){
    for (let i in options){
        if (!configObject.hasOwnProperty(i) || options[i] === undefined || options[i] === null) continue;

        configObject[i] = options[i];
    }
}

async function init() {
    client = await mqtt.connect(`mqtt://${configObject.mqtt}`);

    client.on("connect", function () {
        client.subscribe('hermes/intent/#');

        client.on('message', (topic, message) => {
            let formatted = JSON.parse(message);
            sessionData["siteId"] = formatted.siteId;
            sessionData["sessionId"] = formatted.sessionId;

            configObject.intentHandler(topic, message);
        });
    });
}

function say(text = ""){
    let message = {
        text: text,
        siteId: sessionData["siteId"],
        sessionId: sessionData["sessionId"]
    };

    client.publish('hermes/tts/say', JSON.stringify(message));
}

module.exports = {
    config, init, say
}