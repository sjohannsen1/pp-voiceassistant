const mqtt = require("mqtt");
// const fs = require("fs");
let client;

let configObject = {
    mqtt: 'localhost',
    intentHandler: () => {}
}

let sessionData = {
    siteId: "default",
    sessionId: "",
    answer: ""
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

function setAnswer(answer){
    sessionData.answer = answer;
}

function generateAnswer(vars = [""], separator = "#"){
    let parts = sessionData.answer.split(separator);
    let answer = parts[0];
    for (let i = 1; i < parts.length; i++){
        answer = answer + vars[i-1] + parts[i];
    }
    return answer;
}

//TODO System überlegen
//TODO Dokumentieren
function fail(){
    say("Tut, mir leid mit diesem Befehl gibt es derzeit Probleme");
}

module.exports = {
    config, init, say, generateAnswer, setAnswer, fail
}