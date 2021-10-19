const mqtt = require("mqtt");
let client;

let configObject = {
    mqtt: 'localhost',
    intentHandler: (topic, message) => {}
}

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

        client.on('message', configObject.intentHandler);
    });
}

function say(text = ""){
    sendTTSSay(text)
}

function sendTTSSay(text){

    let message = {
        text: text,
        siteId: getSiteId()
    };
    // sessionId: getSessionId()

    client.publish('hermes/tts/say', JSON.stringify(message));
}

function getSiteId() {
    //TODO return real siteId
    return "satellite";
}

function getSessionId(){
    //TODO return real sessionId
}

module.exports = {
    config, init, say
}