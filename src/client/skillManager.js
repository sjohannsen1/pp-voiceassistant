const axios = require('axios');
const admZip = require('adm-zip')
const fs = require("fs");
const customSdk = require("@fwehn/custom_sdk");
const rhasspy = require("./rhasspy.js");
const path = require("path")

const { execSync } = require("child_process");
const { resolve } = require('path');
require('dotenv').config()


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
        }).forEach(skillModule => {
            delete require.cache[require.resolve(skillModule)]
        });

    skills = {};

    
    getAllCustomSlots(locale).then(customSlots=>{
       customSdk.config({variables: getAllConfigVariables(locale), customSlots: customSlots});
       let skillsLocal = {}; 
    fs.readdirSync(`${__dirname}/skills`).forEach(function(skillName) {
        let path = `${__dirname}/skills/${skillName.toString()}/${getVersion(skillName)}/src`;
        skillsLocal[skillName] = require(path);
    });
    skills = skillsLocal;
    })
    // (Re)Loads all configVariables and the source files from activated skills
    
}

// Downloads the latest version of a Skill as zip and unzips it
function downloadSkill(name = "HelloWorld", tag = "latest") {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.SERVER || "localhost:3000"}/download/${name}/${tag}`, {
            responseType: "arraybuffer"
        }).then(res => {
            let zip = new admZip(res.data);
            zip.extractAllTo(`${__dirname}/skills/${name}`,true);

            resolve(zip.getEntries()[0].entryName.split("/")[0]);
        }).catch(reject);
    })
}

// Function used by the webinterface to save Uploaded skill files to the skill directory
function uploadSkill(name, tag, data){
    return new Promise((resolve, reject) => {
        try{
            let zip = new admZip(data);
            zip.extractAllTo(`${__dirname}/skills/${name}/${tag}`, true);

            resolve(zip.getEntries()[0].entryName.split("/")[0]);
        }catch (e) {
            reject(e);
        }
    })
}

// Deletes the Local Skill-Files
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

// Get a list of Skills on Server
function getRemoteSkills(locale = "de_DE") {
    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.SERVER || "localhost:3000"}/skills/${locale}`).then(res => {
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
        }).catch(reject=>{
            
        });
    });
}

// Get a list of locally installed skills
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

// Shows Overview of local Skill files
function getSkillsOverview(locale = "de_DE"){
    let res = [];
    let skills = getInstalledSkills(locale)
    let configs = getSkillConfigs();

    for (let i in skills){
        let localeFile = getLocale(skills[i], locale);
        // let manifestFile = getManifest(skills[i]);
        let skillConfig = configs[skills[i]] || {};

        res.push({
            active: skillConfig["active"] || false,
            name: skills[i],
            description: localeFile["description"] || "-",
            version: getVersion(skills[i])
        });
    }

    return res;
}

// Get some Detailed Information of a Skill based on locale
function getSkillDetails(name = "HelloWorld", locale = "de_DE"){
    // Loads all required information
    let installed = getInstalledSkills(locale);
    if (!installed.includes(name)){
        console.log("hier ist nichts")
         return {};}

    let localeFile = getLocale(name, locale);
    let manifestFile = getManifest(name);
    let skillOptions = manifestFile["options"];
    let configs = getSkillConfigs()[name] || {};
    let defaults = getDefaults()[locale];

    // Trims down launches to 5 random entries
    let customSlots = customSdk.getCustomSlots(name)
    let launch = defaults["launch"].sort(()=> Math.random() - 0.5);
    launch = launch.slice(0, 5);

    let slots = localeFile.slots
    
    // Removes duplicates
    let filteredSlots={}
    for (let i in slots){
        if (!Object.keys(customSlots).includes(i))
            filteredSlots[i]=slots[i]
    }
    // Trims down custom Slots to 5 random entries
    for(let i in customSlots){
        
        if (customSlots[i] && customSlots[i].length>5){
            let random=Math.floor(Math.random() * (customSlots[i].length-6))
            customSlots[i]=customSlots[i].slice(random, random+5)
        }
    }
   

    slots = {launch: launch.sort(), ...customSlots ,...filteredSlots};
    // Formats the sentences for a better readability
    let formattedSentences = []

    let intents = localeFile["intents"]

    for (let index in intents){
        let intent = intents[index]
        let sentences = intent["sentences"];
        
        for (let i in sentences) {
            //let i = Math.floor(Math.random() * (sentences.length-1))
            sentences[i] = sentences[i].replaceAll(/\(\$slots\/.*?\)/g, "");  // RegEx: "...($slots/zigbee2mqtt){zigbee2mqtt}..." > "...{zigbee2mqtt}..."
            let numberMatches = sentences[i].match(/\(\d+..\d+\){.*?}/g);     // RegEx: identifying "(0..100){brightness}"

            // If the slot is a number range, this will generate a slot with some values to show on the webinterface
            if (numberMatches && numberMatches.length > 0) {
                for (let i in numberMatches){
                    let parts = numberMatches[i].split("{");
                    let key = parts[1].substring(0, parts[1].length-1);
                    let values = parts[0].substring(1, parts[0].length-1).split("..").map(val => parseInt(val, 10));
                    let startValue = values[0];
                    let endValue = values[1];
                    let diff = endValue - startValue;


                    // If the range contains more than 5 values, random values within the range will be picked
                    if (diff > 4){
                        let randomValuesInRange = [];

                        while(randomValuesInRange.length < 3){
                            let rand = Math.floor(Math.random() * (endValue-2)) + 1;
                            if(randomValuesInRange.indexOf(rand) === -1) randomValuesInRange.push(rand);
                        }

                        randomValuesInRange.sort((a, b) => a-b);

                        values = [startValue, ...randomValuesInRange, endValue];
                    }else{
                        values = Array.from({length: diff+1}, (_,index) => startValue+index);
                    }

                    slots[key] = values;
                }
                sentences[i] = sentences[i].replaceAll(/\(\d+..\d+\)/g, "");    // RegEx: "...(0..100){brightness}..." > "...{brightness}..."
            }

            let formattedSentence = `... {launch} ${localeFile["invocation"]} ${sentences[i]}`;
            formattedSentences.push(formattedSentence);
        }
    }

    return {
        active: configs["active"] || false,
        name: name,
        version: getVersion(name),
        description: localeFile["description"],
        sentences: formattedSentences,
        slots: slots,
        options: getFormattedOptionsList(skillOptions, configs["options"] || [])
    }
}

// Generates a list of all options, set in the skillConfigs.json or default values from manifest.json
function getFormattedOptionsList(skillOptions, skillConfig = {}){
    let res = [];

    for (let i in skillOptions){
        let currentOption = skillOptions[i];
        let currentConfig = skillConfig.find(conf => {
            return conf["name"] === currentOption["name"];
        }) || {};

        res.push({
            name: currentOption["name"],
            value: currentConfig["value"] || currentOption["default"],
            type: currentOption["type"],
            choices: currentOption["choices"] || []
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

            let skillOptions = configsFile[skill]["options"];
            if (!skillOptions) skillOptions = [];

            for (let key in values){
                let option = {}
                option["name"] = key;
                option["value"] = values[key];

                let optionToReplace = skillOptions.find(option => {
                    return option["name"] === key;
                });

                if (!optionToReplace) {
                    skillOptions.push(option);
                }else{
                    let index = skillOptions.indexOf(optionToReplace);
                    skillOptions[index] = option;
                }
            }

            configsFile[skill]["options"] = skillOptions;
            writeSkillConfigs(configsFile);
            customSdk.config({variables: getAllConfigVariables(locale)})
            
            getAllCustomSlots(locale).then(customSlots=>{
              customSdk.config({customSlots: customSlots})
              resolve("Options Saved");  
            })
            
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

        let options = getFormattedOptionsList(skillOptions, configs["options"] || []);
        let variables = {};
        for (let i in options){
            variables[options[i]["name"]] = options[i]["value"];
        }

        res[installed[i]] = variables;
    }

    return res;
}

function getAllCustomSlots(locale = "de_DE"){
    return new Promise((resolve, reject) => {rhasspy.getSlots().then(allSlots=>{
        let res = {};
        let installed = getInstalledSkills(locale);

    for (let i in installed){
        let manifestFile = getManifest(installed[i]);
        let slotNames = manifestFile["custom_slots"];
        let customSlots=[]
        for(let i in slotNames){
            customSlots[slotNames[i]] = allSlots.data[`slots/${slotNames[i]}`]
        }
        res[installed[i]] = customSlots;
    }
    resolve(res)

    })
})
}
    

//Sets the "active" Flag in skillConfigs.json
function setActivateFlag(skill, state){
    return new Promise((resolve, reject) => {
        try{
            let configsFile = getSkillConfigs();
            if (!configsFile[skill]) configsFile[skill] = {};

            configsFile[skill]["active"] = state;

            writeSkillConfigs(configsFile);
            resolve("Changes Saved!");
        }catch (e) {
            console.log(e)
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
//Als Promise? 
function installDependencies(skill, version){
    return new Promise((resolve,reject)=>{
      let manifest= getManifest(skill,version)
    let dependencies= manifest.dependencies
    let package= JSON.parse(fs.readFileSync(`${__dirname}/package.json`))
    let newDep=Object.assign(package.dependencies, dependencies)
    package.dependencies=newDep
    fs.writeFileSync(`${__dirname}/package.json`, JSON.stringify(package))
    execSync("npm install",(err, stdout,stderr)=>{
        if (err) {
            console.log(`error: ${error.message}`)
            reject(err)
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            reject(stderr)
        }
        console.log(`stdout: ${stdout}`)
        resolve()
    })  
    })
    

}

function getVersion(skill){
    let configs = getSkillConfigs();
    return configs[skill]["version"];
}

function setVersion(skill, version){
    let configs = getSkillConfigs();
    configs[skill]["version"] = version;
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
            await axios.get(`http://${process.env.SERVER || "localhost:3000"}/update/${locale}/${installed[i]}/${version}`).then(res => {
                if (res.data["update"]) {
                    availableUpdates[installed[i]] = res.data["version"];
                }
            }).catch(reject);
        }

        resolve(availableUpdates);
    });
}

// Returns a funktion based on IntentName
function getFunctionBYIntentName(intentName, slots, locale = "de_DE"){
    let skillName = intentName.split("_")[0];
    let intentNumber = intentName.split("_")[1];

    let intents = getLocale(skillName, locale)["intents"];

    if (!intents[intentNumber]) return {};

    let params = [];
    intents[intentNumber]["args"].forEach(param => params.push(slots[param]));

    return {
        "name": intents[intentNumber]["function"],
        "params": params,
        "answer": intents[intentNumber]["answer"],
        "fail": intents[intentNumber]["fail"] || "no fail response"
    }
}


// Custom Intent Handler to call functions based on Intent and Slots
function customIntentHandler(topic, message){
    let slots = {};
    let formatted = JSON.parse(message.toString())

    if (formatted["intent"]["intentName"].startsWith("_")) {
        console.log(`Ignored Intent: ${formatted["intent"]["intentName"]}`);
        return;
    }

    for (let i in formatted["slots"]){
        let currentSlot = formatted["slots"][i];

        if (currentSlot["slotName"] !== "launch"){
            slots[currentSlot["slotName"]] = currentSlot["value"]["value"];
        }
    }

    let fun = getFunctionBYIntentName(formatted["intent"]["intentName"], slots, process.env.LOCALE || "de_DE");

    if (fun.hasOwnProperty("name") && fun.hasOwnProperty("params") && fun.hasOwnProperty("answer")){
        customSdk.setAnswer(fun["answer"]);
        if(fun.hasOwnProperty("fail"))
            customSdk.setFailResponse(fun["fail"]);

        getSkills()[formatted["intent"]["intentName"].split("_")[0]][fun["name"]].apply(this, fun["params"]);
    }
}

module.exports = {
    skills, loadSkills, downloadSkill, uploadSkill, deleteLocalSkillFiles, getRemoteSkills, getInstalledSkills, getSkillsOverview, getSkillDetails, saveConfig, setActivateFlag, activateSkill, deactivateSkill, setVersion, getUpdates, customIntentHandler, installDependencies, getAllCustomSlots
}