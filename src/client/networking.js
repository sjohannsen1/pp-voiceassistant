const axios = require('axios');

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

module.exports = {
    trainRhasspy, postSentences, postSlots
}