const axios = require('axios');
const admZip = require('adm-zip')
const fs = require("fs");
const customSdk = require("@fwehn/custom_sdk");
const rhasspy = require("./rhasspy.js");
const path = require("path")

// Currently loaded Skills
let skills = {};
// Getter for Skills
function getSkills(){
    return skills;
}
// File-Loader for newly downloaded Skills
function loadSkills(locale = "de_DE"){
    // Deletes old files from the require.cache
    Object.keys(require.cache).filter(entry => {
            let relative = path.relative(`${__dirname}/skills/`, entry);
            return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
        }).forEach(skillModule => delete require.cache[require.resolve(skillModule)]);

    skills = {};
    // (Re)Loads all configVariables and the source files from activated skills
    customSdk.config({variables: getAllConfigVariables(locale)});
    let skillsLocal = {};
    fs.readdirSync(`${__dirname}/skills`).forEach(function(skillName) {
        let path = `${__dirname}/skills/${skillName.toString()}/${getVersion(skillName)}/src`;
        skillsLocal[skillName] = require(path);
    });
    skills = skillsLocal;
}

//Downloads the latest version of a Skill as zip and unzips it
function downloadSkill(name = "HelloWorld", tag = "latest") {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.SERVER}/download/${name}/${tag}`, {
            responseType: "arraybuffer"
        }).then(res => {
            let zip = new admZip(res.data);
            zip.extractAllTo(`${__dirname}/skills/${name}`,true);

            resolve(zip.getEntries()[0].entryName.split("/")[0]);
        }).catch(reject);
    })
}

//Deletes the Local Skill-Files
function deleteLocalSkillFiles(name = "HelloWorld"){
    return new Promise((resolve, reject) => {
        let installed = getInstalledSkills();
        if (!installed.includes(name)) reject('Skill not found!');
        let configsFile = getSkillConfigs();
        if (configsFile.hasOwnProperty(name)){
            delete configsFile[name];
        }
        writeSkillConfigs(configsFile);

        fs.rmSync(`${__dirname}/skills/${name}`, { recursive: true, force: true });
        resolve('Skill deleted!');
    })
}

//Get a list of Skills on Server
function getRemoteSkills(locale = "de_DE") {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.SERVER}/skills/${locale}`).then(res => {
            let skills = [];
            let installed = getInstalledSkills();
            for (let i in res.data) {
                let skillData = res.data[i];

                let installedVersions = []
                if (installed.includes(i)){
                    installedVersions = fs.readdirSync(`${__dirname}/skills/${i}`, {withFileTypes: true}).filter(entry => entry.isDirectory()).map(entry => entry.name);
                }

                skillData["installed"] = installedVersions;
                skills.push(skillData);
            }
            resolve(skills);
        }).catch(reject);
    });
}

//Get a list of locally installed skills
function getInstalledSkills(locale = "de_DE"){
    let path = `${__dirname}/skills`;
    let skills = [];

    fs.readdirSync(path).forEach(skill => {
        fs.readdirSync(`${path}/${skill}/${getVersion(skill.toString())}/locales`).forEach(file => {
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
    let configs = getSkillConfigs();

    for (let i in skills){
        let localeFile = getLocale(skills[i], locale);
        // let manifestFile = getManifest(skills[i]);
        let skillConfig = configs[skills[i]] || {};

        res.push({
            active: skillConfig.active || false,
            name: skills[i],
            description: localeFile.description || "-",
            version: getVersion(skills[i])
        });
    }

    return res;
}

//Get some Detailed Information of a Skill based on locale
function getSkillDetails(name = "HelloWorld", locale = "de_DE"){
    let installed = getInstalledSkills(locale);
    if (!installed.includes(name)) return {};

    let localeFile = getLocale(name, locale);
    let manifestFile = getManifest(name);
    let skillOptions = manifestFile["options"];
    let configs = getSkillConfigs()[name] || {};
    let defaults = getDefaults()[locale];

    let slots = localeFile.slots;
    slots = {launch: defaults["launch"], ...slots};

    let sentences = [];
    for (let i in localeFile.subcommands){
        let utterance = localeFile.subcommands[i].utterance.replaceAll(/\(\$slots\/[a-zA-Z]+\)/g, "");
        let numberMatches = utterance.match(/\(\d+..\d+\){[a-zA-Z]+}/g);

        if (numberMatches && numberMatches.length > 0) {
            for (let i in numberMatches){
                let parts = numberMatches[i].split("{");
                let key = parts[1].substr(0, parts[1].length-1);
                let values = parts[0].substr(1, parts[0].length-2).split("..").map(val => parseInt(val, 10));
                let startValue = values[0];
                let endValue = values[1];
                let diff = endValue - startValue;

                if (diff > 4){
                    let randomValuesInRange = Array.from({length: 3}, () => Math.floor(Math.random() * (diff) + startValue)).sort((a, b) => a-b);
                    values = [...new Set([startValue, ...randomValuesInRange, endValue])];
                }else{
                    values = Array.from({length: diff+1}, (_,index) => startValue+index);
                }

                slots[key] = values;
            }

            utterance = utterance.replaceAll(/\(\d+..\d+\)/g, "");
        }

        let sentence = `... {launch} ${localeFile.invocation} ${utterance}`;
        sentences.push(sentence);
    }

    return {
        active: configs.active || false,
        name: name,
        version: getVersion(name),
        description: localeFile.description,
        sentences: sentences,
        slots: slots,
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
function saveConfig(skill, values, locale){
    return new Promise((resolve, reject) => {
        try {
            let configsFile = getSkillConfigs();
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
            writeSkillConfigs(configsFile);
            customSdk.config({variables: getAllConfigVariables(locale)});
            resolve("Options Saved");
        }catch (e) {
            reject(e);
        }
    });
}

// Returns all Config-Variables of a specific locale
function getAllConfigVariables(locale = "de_DE"){
    let res = {};
    let installed = getInstalledSkills(locale);

    for (let i in installed){
        let name = installed[i];
        let manifestFile = getManifest(installed[i]);
        let skillOptions = manifestFile["options"];
        let configs = getSkillConfigs()[name] || {};

        let options = getFormattedOptionsList(skillOptions, configs.options || []);
        let variables = {};
        for (let i in options){
            variables[options[i].name] = options[i].value;
        }

        res[installed[i]] = variables;
    }

    return res;
}

//Sets the "active" Flag in skillConfigs.json
function setActivateFlag(skill, state){
    return new Promise((resolve, reject) => {
        try{
            let configsFile = getSkillConfigs();
            if (!configsFile[skill]) configsFile[skill] = {};

            configsFile[skill].active = state;

            writeSkillConfigs(configsFile);
            resolve("Changes Saved!");
        }catch (e) {
            reject(e);
        }
    });
}

// Activates a Skill
function activateSkill(skill, locale = "de_DE"){
    return new Promise((resolve, reject) => {
        let installed = getInstalledSkills(locale);
        if (!installed.includes(skill)) reject("Skill not installed or do not support that language!");

        rhasspy.registerSkill(skill, locale, getVersion(skill)).then(() => {
            loadSkills(locale);
            setActivateFlag(skill, true).then(() => resolve("Skill activated!"));
        }).catch(reject);
    })
}

// Deactivates a Skill
function deactivateSkill(skill, locale = "de_DE"){
    return new Promise((resolve, reject) => {
        let installed = getInstalledSkills(locale);
        if (!installed.includes(skill)) reject("Skill not installed or do not support that language!");

        rhasspy.unregisterSkill(skill, locale, getVersion(skill)).then(() => {
            loadSkills(locale);
            setActivateFlag(skill, false).then(() => resolve("Skill deactivated!"));
        }).catch(reject);
    })
}

// returns manifest.json of a specific skill
function getManifest(skill){
    let version = getVersion(skill);
    return JSON.parse(fs.readFileSync(`${__dirname}/skills/${skill}/${version}/manifest.json`).toString());
}

// returns localeFile of skill
function getLocale(skill, locale = "de_DE"){
    let version = getVersion(skill);
    return JSON.parse(fs.readFileSync(`${__dirname}/skills/${skill}/${version}/locales/${locale}.json`).toString());
}

// reads the skillConfigs.json
function getSkillConfigs(){
    return JSON.parse(fs.readFileSync(`${__dirname}/skillConfigs.json`).toString());
}

// writes the skillConfigs.json
function writeSkillConfigs(data){
    fs.writeFileSync(`${__dirname}/skillConfigs.json`, JSON.stringify(data));
}

function getVersion(skill){
    let configs = getSkillConfigs();
    return configs[skill].version;
}

function setVersion(skill, version){
    let configs = getSkillConfigs();
    configs[skill].version = version;
    writeSkillConfigs(configs);
}

// reads the defaults.json
function getDefaults(){
    return JSON.parse(fs.readFileSync(`${__dirname}/defaults.json`).toString());

}

// Get Available Updates based on version in <SkillName>/latest/manifest.json
function getUpdates(locale = "de_DE"){
    return new Promise(async (resolve, reject) => {
        let installed = getInstalledSkills(locale);
        let availableUpdates = {};

        for (let i in installed) {
            let version = getVersion(installed[i]);
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

    let subcommands = getLocale(skillName, locale).subcommands;

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

    if (formatted.intent.intentName.startsWith("_")) {
        console.log(`Ignored Intent: ${formatted.intent.intentName}`);
        return;
    }

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
    skills, loadSkills, downloadSkill, deleteLocalSkillFiles, getRemoteSkills, getInstalledSkills, getSkillsOverview, getSkillDetails, saveConfig, setActivateFlag, activateSkill, deactivateSkill, setVersion, getUpdates, getFunctionMatchingSlots, customIntentHandler
}