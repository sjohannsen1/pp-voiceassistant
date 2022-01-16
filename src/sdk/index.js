const mqtt = require("mqtt");
let client;

let configObject = {
    mqtt: 'localhost',
    intentHandler: () => {},
    variables: {}
}

let sessionData = {
    siteId: "default",
    sessionId: "",
    skill: "",
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
            sessionData["skill"] = formatted.intent.intentName;

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

    console.log(text)
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

function getVariable(variableName){
    return new Promise((resolve, reject) => {
        try{
            let variables = configObject.variables[sessionData["skill"]];

            if (variables && variables[variableName]){
                resolve(variables[variableName])
            }else{
                reject("Variable undefined!");
            }
        }catch (e) {
            reject(e);
        }
    });
}

function getAllVariables(){
    return new Promise((resolve, reject) => {
        try{
            let variables = configObject.variables[sessionData["skill"]];

            if (variables){
                resolve(variables);
            }else{
                reject("Variable undefined!");
            }
        }catch (e) {
            reject(e);
        }
    });
}

function fail(error, message = ""){
    if (!message) message = "Tut, mir leid mit diesem Befehl gibt es derzeit Probleme.";

    say(message);
    console.error(error);
}

module.exports = {
    config, init, say, generateAnswer, setAnswer, getVariable, getAllVariables, fail
}