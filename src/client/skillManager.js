const unzipper = require("unzipper");
const http = require("http");
const axios = require('axios');
const fs = require("fs");

function loadSkills(){
    let skills = {};
    fs.readdirSync(`${__dirname}/skills`).forEach(function(skillName) {
        let path = "./skills/" + skillName + "/latest/src"
        skills[skillName] = require(path);
    });

    return skills;
}

function downloadSkill(name = "HelloWorld") {
    http.get(`http://${process.env.SERVER}/download/${name}`, (res) => {
        res.pipe(unzipper.Extract({path: `${__dirname}\\skills\\${name}`}));
    })
}

async function getRemoteSkills() {
    let skills = [];
    await axios.get(`http://${process.env.SERVER}/skills`).then(res => {
        for (let i in res.data) {
            skills.push(i);
        }

    });
    return skills;
}

function getInstalledSkills(locale = "de_DE"){
    let path = `${__dirname}\\skills\\`;
    let skills = [];

    fs.readdirSync(path).forEach(skill => {
        fs.readdirSync(path + skill.toString() + "\\latest\\locales").forEach(file => {
            if (file.startsWith(locale)){
                skills.push(skill);
            }
        })
    });

    return skills;
}

// Get all functions of intent
function getFunctionsOfSkill(skillName, locale = "de_DE"){
    let functions = {}

    let utterances = JSON.parse(fs.readFileSync(`./skills/${skillName}/latest/locales/${locale}.json`).toString()).utterances;

    for (let i in utterances){
        let functionName = utterances[i]["function"];
        functions[functionName] = {
            args: utterances[i].args,
            answer: utterances[i].answer
        }
    }
    return functions;
}

// Checks if Intent has Function with Matching Slots/Parameters
function getFunctionMatchingSlots(skillName, slots, locale = "de_DE"){
    let fun = {}
    let params = [];

    let functions = getFunctionsOfSkill(skillName, locale);
    for (let i in functions){
        if (functions[i].args.length === Object.keys(slots).length && compareSlotsWithParams(slots, functions[i].args)){
            functions[i].args.forEach(param => params.push(slots[param]));

            fun["name"] = i;
            fun["params"] = params;
            fun["answer"] = functions[i].answer;
            return fun;
        }
    }
    return {};
}

// Compares Slots and Functions to find the right function of Intent
function compareSlotsWithParams(slots, params){
    for (let i in params){
        let param = params[i];
        if (slots[param] === undefined){
            return false;
        }
    }
    return true;
}

//TODO get available updates based on locales/{name}.json

module.exports = {
    loadSkills, downloadSkill, getRemoteSkills, getInstalledSkills, getFunctionMatchingSlots
}