const axios = require('axios');
const fs = require("fs");
require('dotenv').config()

// The Main Function to Communicate with Rhasspy
async function postToRhasspy(endpoint, body){
    return await axios.post(`http://${process.env.RHASSPY || "localhost:12101"}${endpoint}`, body)
}

// Retrains the Rhasspy model
async function trainRhasspy() {
    return await postToRhasspy("/api/train", {});
}

// Adds a Sentence to an Intent
async function postSentences(intentName, intents){
    let data = {}
    let fileName = `intents/${intentName}.ini`;
    let sentencesString = ``;

    for (let i in intents){
        let sentences = intents[i];

        sentencesString = `${sentencesString}[${intentName}_${i}]\n`;
        for (let j in sentences){
            sentencesString = `${sentencesString}${sentences[j]}\n`;
        }

        if (sentences.length === 0) sentencesString = "";
        data[fileName] = sentencesString;
    }
    return await postToRhasspy("/api/sentences",  data);
}

// Adds/Overwrites Slots
async function postSlots(slotName, alternatives, overwrite = false){
    let data = {}
    data[`slots/${slotName}`] = alternatives;

    return await postToRhasspy(`/api/slots?overwrite_all=${overwrite}`, data);
}

async function getSlots(){
    return await axios.get(`http://${process.env.RHASSPY || "localhost:12101"}/api/slots`)
}

// Registering Skill and its Slots in Rhasspy
function registerSkill(skillName, locale = "de_DE", version){
    return new Promise(async (resolve, reject) => {
        let skill = JSON.parse(fs.readFileSync(`${__dirname}/skills/${skillName}/${version}/locales/${locale}.json`).toString());

        // post slots
        for (let slot in skill.slots) {
            await postSlots(slot, skill.slots[slot], true).catch(reject);
        }
        
        // post intents
        let intents = [];
        for (let i in skill["intents"]){
            let sentences = skill["intents"][i]["sentences"];

            let formattedSentences = [];
            for (let j in sentences){
                formattedSentences.push(`($slots/launch){launch} ${skill["invocation"]} ${sentences[j]}`);
            }

            intents.push(formattedSentences);
        }

        postSentences(skillName, intents).then(() => {
            trainRhasspy().then(resolve);
        }).catch(reject);
    });
}

// Unregistering Skill and its Slots in Rhasspy
async function unregisterSkill(skillName, locale = "de_DE", version){
    return new Promise(async (resolve, reject) => {
        let skill = JSON.parse(fs.readFileSync(`${__dirname}/skills/${skillName}/${version}/locales/${locale}.json`).toString());

        // clear slots
        for (let slot in skill.slots) {
            await postSlots(slot, [], true).catch(reject);
        }

        // clear intents
        postSentences(skillName, [[]]).then(() => {

            trainRhasspy().then(resolve);
        }).catch(reject);
    });
}



module.exports = {
    trainRhasspy, postSentences, postSlots, registerSkill, unregisterSkill,postToRhasspy, getSlots
}