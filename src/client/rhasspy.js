const axios = require('axios');
const fs = require("fs");

// The Main Function to Communicate with Rhasspy
async function postToRhasspy(endpoint, body){
    return await axios.post(`http://${process.env.RHASSPY || "localhost:12101"}${endpoint}`, body);
}

// Retrains the Rhasspy model
async function trainRhasspy() {
    return await postToRhasspy("/api/train", {});
}

// Adds a Sentence to an Intent
async function postSentences(intentName, sentences){
    let data = {}
    let fileName = `intents/${intentName}.ini`;
    let sentencesString = ``;

    for (let i in sentences){
        sentencesString = `${sentencesString}[${intentName}_${i}]\n${sentences[i]}\n`;
    }

    if (sentences.length === 0) sentencesString = "";
    data[fileName] = sentencesString;

    return await postToRhasspy("/api/sentences",  data);
}

// Adds/Overwrites Slots
async function postSlots(slotName, alternatives, overwrite = false){
    let data = {}
    data[`slots/${slotName}`] = alternatives;

    return await postToRhasspy(`/api/slots?overwrite_all=${overwrite}`, data);
}

// Registering Skill and its Slots in Rhasspy
function registerSkill(skillName, locale = "de_DE", version){
    return new Promise(async (resolve, reject) => {
        let skill = JSON.parse(fs.readFileSync(`${__dirname}/skills/${skillName}/${version}/locales/${locale}.json`).toString());

        for (let slot in skill.slots) {
            await postSlots(slot, skill.slots[slot], true).catch(reject);
        }

        let sentences = [];
        for (let i in skill.subcommands){
            sentences.push(`($slots/launch){launch} ${skill.invocation} ${skill.subcommands[i].utterance}`);
        }

        postSentences(skillName, sentences).then(() => {
            trainRhasspy().then(resolve);
        }).catch(reject);
    });
}

// Unregistering Skill and its Slots in Rhasspy
async function unregisterSkill(skillName, locale = "de_DE", version){
    return new Promise(async (resolve, reject) => {
        let skill = JSON.parse(fs.readFileSync(`${__dirname}/skills/${skillName}/${version}/locales/${locale}.json`).toString());

        for (let slot in skill.slots) {
            await postSlots(slot, [], true).catch(reject);
        }

        postSentences(skillName, []).then(() => {
            trainRhasspy().then(resolve);
        }).catch(reject);
    });
}



module.exports = {
    trainRhasspy, postSentences, postSlots, registerSkill, unregisterSkill
}