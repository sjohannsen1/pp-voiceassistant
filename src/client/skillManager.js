const axios = require('axios');
const admZip = require('adm-zip')
const fs = require("fs");
const customSdk = require("@fwehn/custom_sdk");
const rhasspy = require("./rhasspy.js");

// Currently loaded Skills
let skills = {};
// Getter for Skills
function getSkills(){
    return skills;
}
// File-Loader for newly downloaded Skills
function loadSkills(){
    //TODO delete the require.cache
    let skillsLocal = {};
    fs.readdirSync(`${__dirname}/skills`).forEach(function(skillName) {
        let path = "./skills/" + skillName + "/latest/src"
        skillsLocal[skillName] = require(path);
    });
    skills = skillsLocal;
}

//Downloads the latest version of a Skill as zip and unzips it
function downloadSkill(name = "HelloWorld") {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.SERVER}/download/${name}`, {
            responseType: "arraybuffer"
        }).then(res => {
            let zip = new admZip(res.data);
            zip.extractAllTo(`${__dirname}\\skills\\${name}`,true);
            resolve("Done!");
        }).catch(reject);
    })
}

//Deletes the Local Skill-Files
function deleteLocalSkillFiles(name = "HelloWorld"){
    return new Promise((resolve, reject) => {
        let installed = getInstalledSkills();
        if (!installed.includes(name)) reject('Skill not found!');
        let configsFile = JSON.parse(fs.readFileSync(`.\\skillConfigs.json`).toString());
        if (configsFile.hasOwnProperty(name)){
            delete configsFile[name];
        }
        fs.writeFileSync(`.\\skillConfigs.json`, JSON.stringify(configsFile));

        fs.rmSync(`${__dirname}\\skills\\${name}`, { recursive: true, force: true });
        resolve('Skill deleted!');
    })
}

//Get a list of Skills on Server
function getRemoteSkills(locale = "de_DE") {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.SERVER}/skills/${locale}`).then(res => {
            let skills = [];
            for (let i in res.data) {
                //TODO check if skill is installed
                skills.push({
                    name: i,
                    version: res.data[i],
                    installed: false
                });
            }
            resolve(skills);
        }).catch(reject);
    });
}

//Get a list of locally installed skills
function getInstalledSkills(locale = "de_DE"){
    let path = `${__dirname}\\skills`;
    let skills = [];

    fs.readdirSync(path).forEach(skill => {
        fs.readdirSync(`${path}\\${skill.toString()}\\latest\\locales`).forEach(file => {
            if (file.startsWith(locale)){
                skills.push(skill);
            }
        })
    });
    return skills;
}

//Shows Overview of local Skill files
function getSkillsOverview(locale = "de_DE"){
    let res = [];
    let skills = getInstalledSkills(locale)

    for (let i in skills){
        let pathToSkill = `${__dirname}\\skills\\${skills[i]}\\latest`;
        let localeFile = JSON.parse(fs.readFileSync(`${pathToSkill}\\locales\\${locale}.json`).toString());
        let manifestFile = JSON.parse(fs.readFileSync(`${pathToSkill}\\manifest.json`).toString());

        //TODO check if skill is activated
        res.push({
            active: true,
            name: skills[i],
            description: localeFile.description || "-",
            version: manifestFile.version
        });
    }

    return res;
}

//Get some Detailed Information of a Skill based on locale
function getSkillDetails(name = "HelloWorld", locale = "de_DE"){
    let installed = getInstalledSkills(locale);
    if (!installed.includes(name)) return {};

    let pathToSkill = `${__dirname}\\skills\\${name}\\latest`;
    let localeFile = JSON.parse(fs.readFileSync(`${pathToSkill}\\locales\\${locale}.json`).toString());
    let manifestFile = JSON.parse(fs.readFileSync(`${pathToSkill}\\manifest.json`).toString());
    let skillOptions = manifestFile["options"];
    let configs = JSON.parse(fs.readFileSync(`.\\skillConfigs.json`).toString())[name] || {};

    //TODO make the sentences readable
    let sentences = [];
    for (let i in localeFile.subcommands){
        sentences.push(localeFile.subcommands[i].utterance);
    }

    return {
        active: configs.active || false,
        name: name,
        version: manifestFile.version,
        description: localeFile.description,
        sentences: sentences,
        options: getFormattedOptionsList(skillOptions, configs.options || [])
    }
}

// Generates a list of all options, set in the skillConfigs.json or default values from manifest.json
function getFormattedOptionsList(skillOptions, skillConfig = {}){
    let res = [];

    for (let i in skillOptions){
        let currentOption = skillOptions[i];
        let currentConfig = skillConfig.find(conf => {
            return conf.name === currentOption.name;
        }) || {};


        //TODO convert option type to html-input-type, e.g. String -> text
        res.push({
            name: currentOption.name,
            value: currentConfig.value || currentOption.default,
            type: currentOption.type,
            choices: currentOption.choices || []
        })
    }

    return res;
}

// Saves/Overwrites the options of a skill in skillConfigs.json
function saveConfig(skill, values){
    return new Promise((resolve, reject) => {
        try {
            let configsFile = JSON.parse(fs.readFileSync(`.\\skillConfigs.json`).toString());
            if (!configsFile[skill]) configsFile[skill] = {};

            let skillOptions = configsFile[skill].options;
            if (!skillOptions) skillOptions = [];

            for (let key in values){
                let option = {}
                option["name"] = key;
                option["value"] = values[key];

                let optionToReplace = skillOptions.find(option => {
                    return option.name === key;
                });

                if (!optionToReplace) {
                    skillOptions.push(option);
                }else{
                    let index = skillOptions.indexOf(optionToReplace);
                    skillOptions[index] = option;
                }
            }

            configsFile[skill].options = skillOptions;
            fs.writeFileSync(`.\\skillConfigs.json`, JSON.stringify(configsFile));
            resolve("Options Saved");
        }catch (e) {
            reject(e);
        }
    });
}

//Sets the "active" Flag in skillConfigs.json
function setActivateFlag(skill, state){
    return new Promise((resolve, reject) => {
        try{
            let configsFile = JSON.parse(fs.readFileSync(`.\\skillConfigs.json`).toString());
            if (!configsFile[skill]) configsFile[skill] = {};

            configsFile[skill].active = state;

            fs.writeFileSync(`.\\skillConfigs.json`, JSON.stringify(configsFile));
            resolve("Changes Saved!");
        }catch (e) {
            reject(e);
        }
    });
}

function activateSkill(skill, locale = "de_DE"){
    return new Promise((resolve, reject) => {
        let installed = getInstalledSkills(locale);
        if (!installed.includes(skill)) reject("Skill not installed or do not support that language!");

        rhasspy.registerSkill(skill, locale).then(() => {
            setActivateFlag(skill, true).then(() => resolve("Skill activated!"));
        }).catch(reject);
    })
}

function deactivateSkill(skill, locale = "de_DE"){
    return new Promise((resolve, reject) => {
        let installed = getInstalledSkills(locale);
        if (!installed.includes(skill)) reject("Skill not installed or do not support that language!");

        rhasspy.unregisterSkill(skill, locale).then(() => {
            setActivateFlag(skill, false).then(() => resolve("Skill deactivated!"));
        }).catch(reject);
    })
}

// Get Available Updates based on version in <SkillName>/latest/manifest.json
function getUpdates(locale = "de_DE"){
    return new Promise(async (resolve, reject) => {
        let installed = getInstalledSkills(locale);
        let availableUpdates = {};

        for (let i in installed) {
            let version = JSON.parse(fs.readFileSync(`${__dirname}\\skills\\${installed[i]}\\latest\\manifest.json`).toString()).version;
            await axios.get(`http://${process.env.SERVER}/update/${locale}/${installed[i]}/${version}`).then(res => {
                if (res.data.update) {
                    availableUpdates[installed[i]] = res.data.version;
                }
            }).catch(reject);
        }

        resolve(availableUpdates);
    });
}

// Get all functions of intent
function getFunctionsOfSkill(skillName, locale = "de_DE"){
    let functions = {}



    let subcommands = JSON.parse(fs.readFileSync(`./skills/${skillName}/latest/locales/${locale}.json`).toString()).subcommands;

    for (let i in subcommands){
        let functionName = subcommands[i]["function"];
        functions[functionName] = {
            args: subcommands[i].args,
            answer: subcommands[i].answer
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

// Custom Intent Handler to call functions based on Intent and Slots
function customIntentHandler(topic, message){
    let slots = {};
    let formatted = JSON.parse(message.toString())
    for (let i in formatted.slots){
        let currentSlot = formatted.slots[i];

        if (currentSlot.slotName !== "launch"){
            //TODO make launch slot accessible to skills
            slots[currentSlot.slotName] = currentSlot.value.value;
        }
    }

    let fun = getFunctionMatchingSlots(formatted.intent.intentName, slots, process.env.LOCALE)

    if (fun.hasOwnProperty("name") && fun.hasOwnProperty("params") && fun.hasOwnProperty("answer")){
        customSdk.setAnswer(fun["answer"]);

        getSkills()[formatted.intent.intentName][fun["name"]].apply(this, fun["params"]);
    }

}

module.exports = {
    skills, loadSkills, downloadSkill, deleteLocalSkillFiles, getRemoteSkills, getInstalledSkills, getSkillsOverview, getSkillDetails, saveConfig, setActivateFlag, activateSkill, deactivateSkill,getUpdates, getFunctionMatchingSlots, customIntentHandler
}