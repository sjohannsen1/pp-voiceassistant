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
    zigbeeGroups: [],
    postSlots: () => {},
    customSlots: [] 
}

// object to store some session data, generated on incoming intents
let sessionData = {
    siteId: "default",
    sessionId: "",
    skill: "",
    answer: "",
    fail: ""
};

// function to change the configObject from outside
function config(options = {}){
    for (let i in options){
        if (!configObject.hasOwnProperty(i) || options[i] === undefined || options[i] === null) continue;
        
        configObject[i] = options[i];
        //console.log(configObject)
    }
}

// function to initialize mqtt-client
async function init() {
    client = await mqtt.connect(`mqtt://${configObject.mqtt}`);

    client.on("connect", function () {
        console.log("connected")
        //say("hola")
        // subscribes to zigbee2mqtt topics to receive changes
        client.subscribe(`${configObject.zigbeeTopic}/bridge/devices`);
        client.subscribe(`${configObject.zigbeeTopic}/bridge/groups`);

        // listens to the incoming intents
        client.subscribe('hermes/intent/#');

        client.on('message', (topic, message) => {
            let formatted = JSON.parse(message);
            console.log(formatted)
            
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
                    sessionData["skill"] = formatted.intent.intentName.split("_")[0];

                    configObject.intentHandler(topic, message);
            }
        });
    });
}

// function to send custom MQTT messages from skill
function publishMQTT(topic = "", payload ){
    if (typeof payload === "string"){
        client.publish(topic, payload);
    }else if (typeof payload === "object"){
        client.publish(topic, JSON.stringify(payload));
    }else{
        fail();
    }
}

// function to get MQTT Address
function getMQTT(){
    return `mqtt://${configObject.mqtt}`
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

function setFailResponse(answer){
    sessionData.fail = answer;
}

// function to generate answer in skill
function generateAnswer(vars = [""], index = 0,separator = "#"){
    let parts = sessionData.answer[index].split(separator);
    let answer = parts[0];
    for (let i = 1; i < parts.length; i++){
        if(!vars[i-1]){
            answer = answer + parts[i]
            return answer
        }
        answer = answer + vars[i-1] + parts[i];
    }
    return answer;
}

function generateFailResponse(vars = [""], index=0, separator = "#"){
    let parts = sessionData.fail[index].split(separator);
    let answer = parts[0];
    for (let i = 1; i < parts.length; i++){
        if(!vars[i-1]){
            answer = answer + parts[i]
            return answer
        }
        answer = answer + vars[i-1] + parts[i];
    }
    return answer;
}

//function to generate an enumeration from a list
function generateEnum(list, join = "und"){
    let enumeration=""
        if(list.length>1){
            for (let index = 0; index < list.length; index++){
            if(!list[index+1]){
                enumeration+=` ${join} ${list[index]}`
                return enumeration
            }
            else
              enumeration+=` ${list[index]}`
          }
        }
        else{
            enumeration=list[0] 
            return enumeration   
        }  
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

//function to setVariable
function setVariable(variableName, value){
    return new Promise((resolve, reject) => {
        try{
            let variables = configObject.variables[sessionData["skill"]];

            if (variables && variables[variableName]){
                variables[variableName]=value
            }else{
                reject("Variable undefined!");
            }
        }catch (e) {
            reject(e);
        }
    });
}

// function to get all variables, set on the details-page of the webinterface
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

// very primitive failing-system that just catches the error and sends a message to the tts-system
function fail(error, message = ""){
    if (!message) message = "Tut, mir leid mit diesem Befehl gibt es derzeit Probleme.";

    say(message);
    console.error(error);
}

function getSlotHandler(){
    return configObject.postSlots
}

function getCustomSlots(name){
    return configObject.customSlots[name]
}

function getAllCustomSlots(){
    return configObject.customSlots
}

module.exports = {
    config, init, publishMQTT, getZigbeeDevices, getZigbeeGroups,say, generateAnswer, setAnswer, getVariable, getAllVariables, fail, getSlotHandler, generateEnum, setVariable, getMQTT, generateFailResponse, setFailResponse, getCustomSlots, getAllCustomSlots
}