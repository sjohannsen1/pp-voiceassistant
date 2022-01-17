const mqtt = require("mqtt");
let client;

// object to store some config data
let configObject = {
    mqtt: 'localhost',
    intentHandler: () => {},
    variables: {},
    zigbeeTopic: "",
    zigbeeUpdater: () => {},
    zigbeeDevices: [],
    zigbeeGroups: []
}

// object to store some session data, generated on incoming intents
let sessionData = {
    siteId: "default",
    sessionId: "",
    skill: "",
    answer: ""
};

// function to change the configObject from outside
function config(options = {}){
    for (let i in options){
        if (!configObject.hasOwnProperty(i) || options[i] === undefined || options[i] === null) continue;

        configObject[i] = options[i];
    }
}

// function to initialize mqtt-client
async function init() {
    client = await mqtt.connect(`mqtt://${configObject.mqtt}`);

    client.on("connect", function () {
        // subscribes to zigbee2mqtt topics to receive changes
        client.subscribe(`${configObject.zigbeeTopic}/bridge/devices`);
        client.subscribe(`${configObject.zigbeeTopic}/bridge/groups`);

        // listens to the incoming intents
        client.subscribe('hermes/intent/#');

        client.on('message', (topic, message) => {
            let formatted = JSON.parse(message);

            switch (topic){
                // zigbee2mqtt device-list changes
                case `${configObject.zigbeeTopic}/bridge/devices`:
                    let devices = formatted.filter(device => device["friendly_name"] !== 'Coordinator');
                    configObject.zigbeeDevices = [];
                    for (let i in devices){
                        configObject.zigbeeDevices.push(devices[i]["friendly_name"]);
                    }
                    configObject.zigbeeUpdater();
                    break;

                // zigbee2mqtt group-list changes
                case `${configObject.zigbeeTopic}/bridge/groups`:
                    let groups = formatted.filter(group => group["friendly_name"] !== 'default_bind_group');
                    configObject.zigbeeGroups = [];
                    for (let i in groups){
                        configObject.zigbeeGroups.push(groups[i]["friendly_name"]);
                    }
                    configObject.zigbeeUpdater();
                    break;

                // intent incoming
                default:
                    sessionData["siteId"] = formatted.siteId;
                    sessionData["sessionId"] = formatted.sessionId;
                    sessionData["skill"] = formatted.intent.intentName;

                    configObject.intentHandler(topic, message);
            }
        });
    });
}

// function to send custom MQTT messages from skill
function publishMQTT(topic, payload =  "{}"){
    client.publish(topic, payload);
}

// getter for zigbee2mqtt devices
function getZigbeeDevices(){
    return configObject.zigbeeDevices;
}

// getter for zigbee2mqtt groups
function getZigbeeGroups(){
    return configObject.zigbeeGroups;
}

// function to use tts from skill
function say(text = ""){
    let message = {
        text: text,
        siteId: sessionData["siteId"],
        sessionId: sessionData["sessionId"]
    };

    console.log(text)
    client.publish('hermes/tts/say', JSON.stringify(message));
}

// internal setter for answer
function setAnswer(answer){
    sessionData.answer = answer;
}

// function to generate answer in skill
function generateAnswer(vars = [""], separator = "#"){
    let parts = sessionData.answer.split(separator);
    let answer = parts[0];
    for (let i = 1; i < parts.length; i++){
        answer = answer + vars[i-1] + parts[i];
    }
    return answer;
}

// function to get specific variable, set on the details page
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

// function to get all variables, set on the details page
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
    config, init, publishMQTT, getZigbeeDevices, getZigbeeGroups,say, generateAnswer, setAnswer, getVariable, getAllVariables, fail
}