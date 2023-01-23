const rhasspy = require("./rhasspy.js");
const customSdk = require("@fwehn/custom_sdk");
const skillManager = require("./skillManager.js");
const webinterface = require("./webinterface.js");
const cli = require("./cli-tool.js");
const fs = require("fs");
const { config } = require("dotenv");
const defaults = JSON.parse(fs.readFileSync(`./defaults.json`).toString())[process.env.LOCALE || "de_DE"];

// used by sdk to determine if the system has been initialized
let initiated = false;
function getInitStatus(){
    return initiated;
}

// loads local skill files
skillManager.loadSkills();
// setting some configurations for sdk to work smoothly
customSdk.config({
    mqtt: process.env.MQTTHOST || "localhost",
    port: process.env.MQTTPORT || "12183",
    intentHandler: skillManager.customIntentHandler,
    zigbeeTopic: process.env.ZIGBEETOPIC || "zigbee2mqtt",
    zigbeeUpdater: updateZigbeeList,
    postSlots: postSlots//,
    //slotUpdater: updateCustomSlots
});
// Clears Zigbee-list, inits the sdk and registers the default launch slots in Rhasspy
//rhasspy.postSlots("zigbeeDevices", [], true).catch(console.error)
customSdk.init().catch(console.error)
rhasspy.postSlots("launch", defaults["launch"], true)
    .then(() => rhasspy.trainRhasspy().then(() => initiated = true))
    .catch(console.error);



// Callback function to register Zigbee devices as a Slot in Rhasspy

//change: seperated Zigbee Devices from Groups
function updateZigbeeList(){
    let zigbeeNames = [...customSdk.getZigbeeDevices()] || [];
    rhasspy.postSlots("zigbee_devices", zigbeeNames, true)
        .then(() => {
            if (!getInitStatus()) return;
            rhasspy.trainRhasspy().catch(console.error);
        }).catch(console.error);
    
        let zigbeeGroups = [...customSdk.getZigbeeGroups()] || [];
        rhasspy.postSlots("zigbee_groups", zigbeeGroups, true)
            .then(() => {
                if (!getInitStatus()) return;
                rhasspy.trainRhasspy().catch(console.error);
            }).catch(console.error);
}
/*
function updateCustomSlots(){
    let customSlots = customSdk.getAllCustomSlots() || [];
    rhasspy.getSlots().then(allSlots=>{
        console.log(allSlots)
        for (let skill in customSlots){
            for (let slot in skill)
                customSlots[skill][slot]=allSlots.data[`slots/${slot}`]
        }
        console.log(customSlots)
    })
}*/

function postSlots(slotName, alternatives, overwrite = false){
    rhasspy.postSlots(slotName, alternatives, overwrite).then(() => {
        if (!getInitStatus()) return
        rhasspy.trainRhasspy().catch(console.error)
        skillManager.getAllCustomSlots().then(customSlots => customSdk.config({customSlots: customSlots}))
    }).catch(console.error)

}

// Starts Web-UI and CLI
webinterface.startUI(process.env.LOCALE || "de_DE", process.env.PORT || "12102" );
cli.startCLI(process.env.LOCALE);

