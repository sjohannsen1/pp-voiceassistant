const axios = require('axios');
const skillManager = require("./skillManager.js");
const fs = require("fs");

// The Main Function to Communicate with Rhasspy
async function postToRhasspy(endpoint, body){
    return await axios.post("http://" + process.env.RHASSPY + endpoint, body);
}

// Retrains the Rhasspy model
async function trainRhasspy() {
    return await postToRhasspy("/api/train", {});
}

// Adds a Sentence to an Intent
async function postSentences(intentName, sentences){
    let data = {}
    let fileName = `intents/${intentName}.ini`;
    let sentencesString = `[${intentName}]`;

    for (let i in sentences){
        sentencesString = `${sentencesString}\n${sentences[i]}`;
    }
    data[fileName] = sentencesString;

    return await postToRhasspy("/api/sentences",  data);
}

// Adds/Overwrites Slots
async function postSlots(slotName, alternatives, overwrite = false){
    let data = {}
    data[`slots/${slotName}`] = alternatives;

    return await postToRhasspy(`/api/slots?overwrite_all=${overwrite}`, data);
}

// Register Skills in Rhasspy
async function registerSkills(locale = "de_DE"){
    let skillNames = skillManager.getInstalledSkills(locale);

    let defaults = JSON.parse(fs.readFileSync(`${__dirname}\\defaults.json`).toString());
    await postSlots("launch", defaults[locale]["launch"],true).then(res => console.log(res.data + " - launch"));

    for (let i in skillNames){
        let raw = fs.readFileSync(`${__dirname}\\skills\\${skillNames[i]}\\latest\\locales\\${locale}.json`).toString();
        let skill = JSON.parse(raw);

        for (let slot in skill.slots){
            await postSlots(slot, skill.slots[slot], true).then(res => console.log(res.data + " - " + slot));
        }

        let sentences = [];
        for (let i in skill.utterances){
            sentences.push(`($slots/launch){launch} ${skill.invocation} ${skill.utterances[i].utterance}`);
        }

        await postSentences(skillNames[i], sentences).then(res => console.log(res.data));
    }
    await trainRhasspy().then(res => console.log(res.data));
}

module.exports = {
    trainRhasspy, postSentences, postSlots, registerSkills
}